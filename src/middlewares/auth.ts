import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const autheticateToken = (req: Request, res: Response, next: NextFunction) => {
  const autHeader = req.headers['authorization'];
  const token = autHeader && autHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  };

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) {
      if (err.name == 'TokenExpired') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.sendStatus(403)
    };
    (req as any).user = user;
    next();
  });
};

export default autheticateToken;