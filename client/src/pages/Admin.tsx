import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/api';
import { UserInterface } from '../types/User';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getAllUsers(token);
          setUsers(response);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = () => {

  }

  return (
    <div>
      <h2>Admin Page</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={handleDelete}>Delete</button>
            <button>Update</button>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default Admin;
