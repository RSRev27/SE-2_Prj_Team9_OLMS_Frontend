import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import SideNav from './components/SideNav';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Homepage';
import CoursePage from './components/CoursePage';
import CourseStream from './components/CourseStream';
import Lectures from './components/Lecture';
import Announcements from './components/Announcements';
import Assignments from './components/Assignments';
import Help from './components/Help';
import AccessDenied from './components/AccessDenied';
import Grades from './components/Grades';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = window.location.pathname;
  const isLoginPage = location === '/login';

  // Function to set authentication state
  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus);
  };
  // In App.jsx
const handleLogout = (authStatus) => {
  setIsAuthenticated(authStatus);
};

  return (
    <Router>
      <div className="app-container">
        {!isLoginPage && <SideNav onLogout={handleLogout} />}
        <div className={!isLoginPage ? "main-content" : "login-content"}>
          <Routes>
            <Route path="/" element={<AccessDenied/>} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

            {/* Protected Routes */}
            <Route path="/help" element={isAuthenticated ? <Help /> : <AccessDenied />} />
            <Route path="/home" element={isAuthenticated?<HomePage/>:<AccessDenied/>}/>
            <Route path="/courses" element={isAuthenticated?<HomePage/>:<AccessDenied/>}/>
            <Route path="/courses/:courseId" element={isAuthenticated ? <CoursePage /> : <AccessDenied />} />
            <Route path="/courses/:courseId/stream" element={isAuthenticated ? <CourseStream /> : <AccessDenied />} />
            <Route path="/courses/:courseId/modules" element={isAuthenticated ? <Lectures /> : <AccessDenied />} />
            <Route path="/courses/:courseId/announcements" element={isAuthenticated ? <Announcements /> : <AccessDenied />} />
            <Route path="/courses/:courseId/assignments" element={isAuthenticated ? <Assignments /> : <AccessDenied />} />
            <Route path="/courses/:courseId/grades" element={isAuthenticated ? <Grades/> : <AccessDenied />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;