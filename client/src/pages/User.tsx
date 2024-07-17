import React, { useEffect, useState } from 'react';
import Logout from '../components/LogOut';

const User: React.FC = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName);
  }, []);

  return (
    <div>
      <h2>User Page</h2>
      <p>Welcome, {name}</p>
      {<Logout />}
    </div>
  );
};

export default User;