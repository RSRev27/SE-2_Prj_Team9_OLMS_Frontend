// SideNav.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

const SideNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (example approach, replace with actual login logic)
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <nav className="sidenav">
      <ul>
        <li>
          {isAuthenticated ? (
            <Link to="/account" aria-label='Account'>
              <div className="icon circle-icon"></div>
              <span>Account</span>
            </Link>
          ) : (
            <Link to="/login" aria-label="Login">
              <div className="icon circle-icon"></div>
              <span>Login</span>
            </Link>
          )}
        </li>
        <li>
          <Link to="/home" aria-label="Home">
            <div className="icon circle-icon"></div>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/help" aria-label="Help">
            <div className="icon question-icon"></div>
            <span>Help</span>
          </Link>
        </li>
        <li>
          <Link to="/courses" aria-label="Courses">
            <div className="icon book-icon"></div>
            <span>Courses</span>
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default SideNav;