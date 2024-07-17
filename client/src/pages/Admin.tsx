import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/api';
import { UserInterface } from '../types/User';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getAllUsers(token);
          const filteredUsers = response.filter(user => user.role !== 'admin');
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== parseInt(id, 10)));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id.toString())}>Delete</button>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default Admin;
