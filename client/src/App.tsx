import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/users" Component={Users} />
      </Routes>
    </Router>
  );
};

export default App;