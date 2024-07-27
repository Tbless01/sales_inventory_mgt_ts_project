import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig'; 
import { sendProfileUserActivationEmail } from '../services/mailService/mailServiceImpl';

const userRepository = new UserRepository();

export class UserService {
  async createUser(username: string, password: string): Promise<void> {
    const userFound =  await userRepository.findByUsername(username);
    if (userFound) {
      throw new Error(`User with username ${username} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = { id: 0, username, password: hashedPassword };
    await userRepository.create(user);
  }
  async getUser(username: string): Promise<User | null> {
    const userFound = await userRepository.findByUsername(username);

    const response = await sendProfileUserActivationEmail(username, "IBK");
    console.log('Response:', response);

    return userFound;
  }


  async loginUser(username: string, password: string): Promise<string> {
    const user = await userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
  }


  async getAll(pageNumber: number, pageSize: number): Promise<User[]> {
    return await userRepository.getAll(pageNumber, pageSize);
  }
}