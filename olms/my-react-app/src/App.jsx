import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import SideNav from './components/SideNav';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Homepage';
import CoursePage from './components/CoursePage'
import CourseStream from './components/CourseStream'
import Lectures from './components/Lecture';
import Announcements from './components/Announcements';
import Assignments from './components/Assignments';

function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = true;
  const location = window.location.pathname;
  const isLoginPage = location === '/login';

  return (
    <Router>
      <div className="app-container">
        {!isLoginPage && <SideNav />}
        <div className={!isLoginPage ? "main-content" : "login-content"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/help" element={<HomePage />} />
            <Route path="/courses" element={<HomePage />} />
            <Route path="/courses/:courseId" element={<CoursePage/>}></Route>
            <Route path="/courses/:courseId/stream" element={<CourseStream/>}></Route>
            <Route path="/courses/:courseId/modules" element={<Lectures />} />
            <Route path="/courses/:courseId/announcements" element={<Announcements />} />
            <Route path="/courses/:courseId/assignments" element={< Assignments/>} />
          </Routes>
        </div>
      </div>
      <div>
      </div>
    </Router>
  );
}

export default App;