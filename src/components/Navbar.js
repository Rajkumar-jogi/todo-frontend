import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import '../styles/navbar.css'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');
  useEffect(() => {
    if (jwtToken) {
      // If token exists, set authentication status
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [jwtToken]); 

  const handleLogout = () => {
    Cookies.remove('jwt_token'); // Remove JWT token on logout
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header>
      <h1>Todo App</h1>
      <nav>
        <Link to='/'>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/todos"><span>Todos</span></Link>
            <button className='nav-bar-btn' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className='nav-bar-btn' >Login</button></Link>
            <Link to="/register"><button className='nav-bar-btn'>Register</button></Link>
          </>
        )}
      </nav>
    </header>
    
  );
};

export default Navbar;
