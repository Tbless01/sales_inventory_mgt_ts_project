import { SalesRepository } from '../repositories/salesRepository';
import { Sale } from '../models/salesModel';

const salesRepository = new SalesRepository();

export class SalesService {
  async getAll(): Promise<Sale[]> {
    return await salesRepository.getAll();
  }


  async getById(id: number): Promise<Sale | null> {
    return await salesRepository.getById(id);
  }


  async create(newSale: Sale): Promise<Sale> {
      const insertedSale = await salesRepository.create(newSale);
      const createdSale = await this.getById(insertedSale.id);

      if (!createdSale) {
        throw new Error('Failed to fetch newly created sale');
      }
      return createdSale;
    }


  async update(id: number, sale: Partial<Sale>): Promise<void> {
    return await salesRepository.update(id, sale);
  }


  async delete(id: number): Promise<void> {
    return await salesRepository.delete(id);
  }
}
