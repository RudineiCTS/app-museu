import csvParse from 'csv-parse';
import fs from 'fs';
import { getRepository, getCustomRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVTransaction {
  title: string;
  type: 'outcome' | 'income';
  value: number;
  category: string[];
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const readCsvFile = fs.createReadStream(filePath);

    const parses = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });
    const categories: string[] = [];
    const transactions: CSVTransaction[] = [];

    const parseCSV = readCsvFile.pipe(parses);

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line;
      if (!title || !type || !value) {
        return;
      }
      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const existentCategory = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    // percorrendo a variavel que contém as categorias existentes
    // retornando apenas os titles
    const existentCategoryTitle = existentCategory.map(
      (category: Category) => category.title,
    );

    // filtrando o array de categoria e removendo as categorias que já existe no banco
    const addCategory = categories
      .filter(category => !existentCategoryTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategory = categoryRepository.create(
      addCategory.map(title => ({
        title,
      })),
    );
    await categoryRepository.save(newCategory);

    const finalCategories = [...newCategory, ...existentCategory];

    const newTransaction = transactionRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title.toString === transaction.category.toString,
        ),
      })),
    );

    await transactionRepository.save(newTransaction);

    await fs.promises.unlink(filePath);

    return newTransaction;
  }
}

export default ImportTransactionsService;
