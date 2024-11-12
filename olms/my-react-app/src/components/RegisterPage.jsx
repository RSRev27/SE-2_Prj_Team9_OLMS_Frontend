import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './RegisterPage.css';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName]=useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL+'/olms/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: email, password: password , fullName: name , role: role }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.userId) {
          // If JWT token is returned, authenticate the user
          localStorage.setItem('userId', data.userId);  // Store the token
          onRegister(true);  // Update the login state in the parent component
          navigate('/home');
        
        } else {
          alert('Invalid Register. Please try again!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the Register request.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
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
            <label>Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="TA">TA</option>
              <option value="Professor">Professor</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <button type="submit" className="login-button">Register</button>
        </form>
        <p>
          Don't have an account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

