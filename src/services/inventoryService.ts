import { InventoryRepository } from '../repositories/inventoryRepository';
import { Inventory } from '../models/inventoryModel';

const inventoryRepository = new InventoryRepository();

export class InventoryService {
  async getAll(pageNumber: number, pageSize: number): Promise<Inventory[]> {
    return await inventoryRepository.getAll(pageNumber, pageSize);
  }

  async getById(id: number): Promise<Inventory | null> {
    return await inventoryRepository.getById(id);
  }

  async create(inventory: Inventory): Promise<void> {
    return await inventoryRepository.create(inventory);
  }

  async update(id: number, inventory: Inventory): Promise<void> {
    const existingItem = await inventoryRepository.getById(id);
  
    if (!existingItem) {
      throw new Error(`Inventory item with id ${id} not found`);
    }
    return await inventoryRepository.update(id, inventory);
  
  }

  async delete(id: number): Promise<void> {
    const existingItem = await inventoryRepository.getById(id);
    if (!existingItem) {
        throw new Error(`Inventory item with id ${id} not found`);
      }
      return await inventoryRepository.delete(id);
    
    }
}
