// src/components/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    fetch('https://glorious-engine-v7p9w6gpjr6cxp99-8080.app.github.dev/olms/login/verification', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: email, password: password }), // Replace with your data
  })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Valid Authentication') {
          navigate('/Homepage');
        } else {
          
          alert('Invalid login. Please try again!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the login request.');
      });
    }

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
