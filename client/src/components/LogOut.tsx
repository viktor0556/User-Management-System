import { useNavigate } from 'react-router-dom';
import React from 'react';

const Logout: React.FC = () => {

  const navigate = useNavigate() 

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <button onClick={handleLogOut}>
      Logout
    </button>
  )
}

export default Logout;