import { Request, Response } from 'express';
import { InventoryService } from '../services/inventoryService';
import { Inventory } from '../models/inventoryModel';

const inventoryService = new InventoryService();

export class InventoryController {
  async getAll(req: Request, res: Response): Promise<void> {
    const pageNumber = parseInt(req.query.pageNumber as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    try {
      const inventories = await inventoryService.getAll(pageNumber, pageSize);
      res.json(inventories);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
        }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const inventory = await inventoryService.getById(id);
    if (inventory) {
      res.json(inventory);
    } else {
      res.status(404).send('Inventory not found');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const newInventory: Inventory = req.body;
    await inventoryService.create(newInventory);
    res.status(201).send('Inventory created');
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedInventory: Inventory = req.body;
    try {
        await inventoryService.update(id, updatedInventory);
        const updatedItem = await inventoryService.getById(id); 
        res.status(200).json({
          data: updatedItem,
          message: 'Inventory item updated successfully',
        });
      }  catch (error) {
        if (error instanceof Error) {
          res.status(404).json({ message: error.message });
        }
  }
  }
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
        await inventoryService.delete(id);
        res.status(200).json({ message: 'Inventory successfully deleted' });
      }  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
      }
}
}
