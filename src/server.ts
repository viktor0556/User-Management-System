import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

app.get('/', (_req: Request, res: Response) => {
  res.json('');
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
