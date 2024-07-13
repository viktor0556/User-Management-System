import { Request, Response } from 'express';
import pool from '../utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.json(newUser.rows[0]);
    console.log('Successful registration');
  } catch (err: any) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = $1', [email], async (err, results) => {
    if (err) throw err;

    if (results.rows.length > 0) {
      const user = results.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: '1h' }
        );
        res.json({ accessToken });
      } else {
        res.status(401).send('Invalid password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
};
