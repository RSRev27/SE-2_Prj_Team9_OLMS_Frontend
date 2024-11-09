import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[userType,setUserType]=useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL+'/olms/login/verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: email, password: password , userType: userType }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.authentication === 'Valid Authentication') {
          localStorage.setItem('userType', userType);
          onLogin(true);  // Update authentication state in App
          navigate('/home');  // Redirect to Help page
        
        } else {
          alert('Invalid login. Please try again!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the login request.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

