import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';
import NewPassword from './pages/NewPassword';
import Home from './pages/Home';
import PhoneAddress from './pages/PhoneAddress';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/admin" Component={Admin} />
        <Route path="/user" Component={User} />
        <Route path="/new-password" Component={NewPassword} />
        <Route path='/phone-address-change' Component={PhoneAddress}/>
      </Routes>
    </Router>
  );
};

export default App;