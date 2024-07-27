import { Request, Response } from 'express';
import { SalesService } from '../services/salesService';
import { Sale } from '../models/salesModel';
import { InventoryService } from '../services/inventoryService';

const salesService = new SalesService();
const inventoryService = new InventoryService();

export class SalesController {
  async getAll(req: Request, res: Response): Promise<void> {
    const sales = await salesService.getAll();
    res.json(sales);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const sale = await salesService.getById(id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).send('Sale not found');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newSale: Sale = req.body;

      const product = await inventoryService.getById(newSale.productId);
      if (!product) throw new Error('Product not found');

      const currentDate = new Date();
      newSale.saleDate = currentDate;
      const createdSale = await salesService.create(newSale);
      const sale = await salesService.getById(createdSale.id);
      res.status(201).json({ data: sale, message: 'Sale successfully created' });
    } catch (error) {
      console.error('Error creating sale:', error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        // Handle unknown or unexpected errors
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedSale: Sale = req.body;
    await salesService.update(id, updatedSale);
    res.send('Sale updated');
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await salesService.delete(id);
    res.send('Sale deleted');
  }
}
