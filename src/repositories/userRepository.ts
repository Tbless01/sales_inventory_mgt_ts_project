import { pool } from '../config/dbConfig';
import { User } from '../models/userModel';
import { RowDataPacket } from 'mysql2';

export class UserRepository {
  async create(user: User): Promise<void> {
    await pool.query('INSERT INTO user (username, password) VALUES (?, ?)', [user.username, user.password]);
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM user WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] as User : null;
  }

  async getAll(pageNumber: number, pageSize: number): Promise<User[]> {
    const offset = (pageNumber - 1) * pageSize;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM user LIMIT ? OFFSET ?', [pageSize, offset]);
    return rows as User[];
  }
}
