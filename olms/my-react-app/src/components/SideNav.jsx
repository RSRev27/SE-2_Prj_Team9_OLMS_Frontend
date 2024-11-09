import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';

const SideNav = ({ onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    onLogout(false);
    navigate('/login');
  };

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
        {isAuthenticated && (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors w-full"
              aria-label="Logout"
            >
              <div className="icon logout-icon"></div>
              <span>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;