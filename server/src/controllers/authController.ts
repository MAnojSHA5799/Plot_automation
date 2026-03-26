import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Simple mock login
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { username: 'admin', role: 'Admin' } });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
