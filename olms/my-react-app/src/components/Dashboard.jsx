import React from 'react';
import CourseCard from './CourseCard';

const Dashboard = ({ courses }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="course-list">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;