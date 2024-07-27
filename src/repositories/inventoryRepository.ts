import { pool } from '../config/dbConfig';
import { Inventory } from '../models/inventoryModel';
import { RowDataPacket } from 'mysql2';

export class InventoryRepository {
  async getAll(pageNumber: number, pageSize: number): Promise<Inventory[]> {
    const offset = (pageNumber - 1) * pageSize;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM inventory LIMIT ? OFFSET ?', [pageSize, offset]);
    return rows as Inventory[];
  }


    async getById(id: number): Promise<Inventory | null> {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM inventory WHERE id = ?', [id]);
      return rows[0] as Inventory | null;
    }


  async create(inventory: Inventory): Promise<void> {
    await pool.query('INSERT INTO inventory (productName, quantity, price) VALUES (?, ?, ?)', 
      [inventory.productName, inventory.quantity, inventory.price]);
  }

  
  async update(id: number, inventory: Partial<Inventory>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];
  
    if (inventory.productName !== undefined) {
      fields.push('productName = ?');
      values.push(inventory.productName);
    }
  
    if (inventory.quantity !== undefined) {
      fields.push('quantity = ?');
      values.push(inventory.quantity);
    }
  
    if (inventory.price !== undefined) {
      fields.push('price = ?');
      values.push(inventory.price);
    }
  
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }
  
    values.push(id); 

    const query = `UPDATE inventory SET ${fields.join(', ')} WHERE id = ?`;
  
    await pool.query(query, values);
  }
  

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM inventory WHERE id = ?', [id]);
  }
}
