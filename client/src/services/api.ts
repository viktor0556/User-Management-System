import axios from 'axios';
import { UserInterface, LoginResponse } from '../types/User';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getAllUsers = async (token: string): Promise<UserInterface[]> => {
  try {
    const response = await api.get<UserInterface[]>('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};

export const newPassword = async (email: string, currentPassword: string, newPassword: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error ('No token found');
  }
  const response = await api.post('/auth/change-password', { email, currentPassword, newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await api.delete(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
