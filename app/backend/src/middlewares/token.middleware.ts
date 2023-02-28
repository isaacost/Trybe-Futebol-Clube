import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET as string;

const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decoded = verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verificaToken;
