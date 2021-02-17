import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    try {
      const sameName = await categoryRepository.findOne({
        where: {
          title: category,
        },
      });
      if (sameName) {
        const transaction = transactionRepository.create({
          title,
          value,
          type,
          category_id: sameName.id,
        });

        await transactionRepository.save(transaction);
        return transaction;
      }
      const newCategory = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(newCategory);

      const transaction = transactionRepository.create({
        title,
        value,
        type,
        category_id: newCategory.id,
      });

      await transactionRepository.save(transaction);

      return transaction;
    } catch (err) {
      throw new AppError('could not create transaction', 400);
    }
  }
}

export default CreateTransactionService;
