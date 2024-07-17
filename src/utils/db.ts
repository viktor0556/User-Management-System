import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database:process.env.DB,
  password:process.env.PASSWORD,
  port: Number(process.env.PORT)
})

export default pool;