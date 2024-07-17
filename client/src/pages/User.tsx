import React, { useEffect, useState } from 'react';

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
    </div>
  );
};

export default User;