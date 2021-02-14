import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    try {
      const transaction_id = await transactionRepository.findOne(id);

      if (!transaction_id) {
        throw new AppError('id is not found');
      }
      transactionRepository.delete(id);
    } catch (err) {
      throw new AppError('could not delete transaction', 400);
    }
  }
}

export default DeleteTransactionService;
