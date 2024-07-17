import { Request, Response } from 'express';
import pool from '../utils/db';

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

export const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};


export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
    [name, email, password, id],
    (err, _result) => {
      if (err) throw err;
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, _result) => {
    if (err) throw err;
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};


