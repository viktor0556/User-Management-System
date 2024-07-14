import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { User } from '../types/User';
import Logout from '../components/LogOut';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const users = await getUsers(token);
          console.log('Fetched Users:', users); 
          setUsers(users);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Logout />
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;