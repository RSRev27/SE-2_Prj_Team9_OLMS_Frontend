// CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      <div className="course-card-content">
        <img src={course.image} alt={course.title} className="course-image" />
        <h3>{course.title}</h3>
        <h4>{course.rating} ★</h4> {/* Display the rating here */}
      </div>
    </Link>
  );
};

export default CourseCard;
