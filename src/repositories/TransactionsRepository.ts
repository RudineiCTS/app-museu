import { EntityRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    try {
      const allTransactions = await this.find();

      const { income, outcome } = allTransactions.reduce(
        (accumulator, currentValue) => {
          if (currentValue.type === 'income') {
            accumulator.income += Number(currentValue.value);
          }
          if (currentValue.type === 'outcome') {
            accumulator.outcome += Number(currentValue.value);
          }
          return accumulator;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

      const total = income - outcome;

      return { income, outcome, total };
    } catch (err) {
      throw new AppError('coud not possible calculed balance');
    }
  }
}

export default TransactionsRepository;
