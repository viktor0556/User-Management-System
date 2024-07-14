import axios from 'axios';
import { User } from '../types/User';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<{ accessToken: string }> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};