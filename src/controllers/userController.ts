import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      await userService.createUser(username, password);
      const savedUser = await userService.getUser(username); // Await here to resolve the promise

      if (savedUser) {
        const { password, ...userWithoutPassword } = savedUser; // Exclude password from the response
        res.status(201).json({ 
          data: userWithoutPassword,
          message: 'User registered successfully'
        });
      } else {
        res.status(404).json({ message: 'User not found after registration' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
        }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const token = await userService.loginUser(username, password);
      res.status(200).json({ status: res.status,
        token: token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
        }
  }


   async getAll(req: Request, res: Response): Promise<void> {
    const pageNumber = parseInt(req.query.pageNumber as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    try {
      const users = await userService.getAll(pageNumber, pageSize);

      // Exclude passwords from the response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.status(200).json({ 
        data: usersWithoutPasswords,
        message: 'Users retrieved successfully'
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
        }
  }
}
