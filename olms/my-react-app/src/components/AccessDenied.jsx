import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <h1>Access Denied</h1>
      <p>You must be logged in to view this page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default AccessDenied;
