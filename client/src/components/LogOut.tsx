import { useNavigate } from 'react-router-dom';
import React from 'react';

const Logout: React.FC = () => {

  const navigate = useNavigate() ;

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <button
    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    onClick={handleLogOut}
    >
      Logout
    </button>
  )
}

export default Logout;