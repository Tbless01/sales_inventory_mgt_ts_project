import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';

const appMiddleware = express();

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  jwt.verify(token, jwtConfig.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    (req as any).user = decoded;
    next();
  });
}

export function whitelistMiddleware(req: Request, res: Response, next: NextFunction) {
  const allowedEndpoints = ['/api/login', '/api/register'];
  if (allowedEndpoints.includes(req.path)) {
    next();
  } else {
    res.status(403).json({ message: 'Access Forbidden' });
  }
}

export default appMiddleware;
