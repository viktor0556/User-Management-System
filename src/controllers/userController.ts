import { Request, Response } from 'express';
import pool from '../utils/db';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = (_req: Request, res: Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
    if (err) {
      console.error('Error in getUsers:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.rows[0]);
  } catch (err: any) {
    console.error("Get User Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cellphone, address } = req.body;

  console.log('Received ID:', id);
  console.log('Received data:', { cellphone, address });

  try {

    const updatedUser = await pool.query(
      'UPDATE users SET cellphone = $1, address = $2 WHERE id = $3 RETURNING *',
      [cellphone, address, id]);

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(updatedUser.rows[0]);
  } catch (err: any) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted succesfully' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error' })
  }
};


