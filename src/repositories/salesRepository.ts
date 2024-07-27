import { pool } from '../config/dbConfig';
import { Sale } from '../models/salesModel';
import { RowDataPacket } from 'mysql2';
import { Connection, ResultSetHeader } from 'mysql2/promise';

export class SalesRepository {
  async getAll(): Promise<Sale[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM sales');
    return rows as Sale[];
  }

  async getById(id: number): Promise<Sale | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM sales WHERE id = ?', [id]);
    return rows[0] as Sale || null;
  }

  async create(sale: Sale): Promise<Sale> {
    try {
      const [result] = await pool.query('INSERT INTO sales (productId, quantity, saleDate) VALUES (?, ?, ?)', 
        [sale.productId, sale.quantity, sale.saleDate]);
      const insertedId = (result as ResultSetHeader).insertId;
      const insertedSale = { ...sale, id: insertedId }; 
      return insertedSale;
    } catch (error) {
      console.error('Error inserting sale:', error);
      throw error; 
    }
  }

  async update(id: number, sale: Partial<Sale>): Promise<void> {
    await pool.query('UPDATE sales SET productId = ?, quantity = ?, saleDate = ? WHERE id = ?', 
      [sale.productId, sale.quantity, sale.saleDate, id]);
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM sales WHERE id = ?', [id]);
  }
}
