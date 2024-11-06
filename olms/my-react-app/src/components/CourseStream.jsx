// CourseStream.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './CourseStream.module.css';

const CourseStream = ({ announcements = [], assignments = [] }) => {
  const { courseId } = useParams(); // Access courseId from URL parameters

  return (
    <div className={styles.courseStream}>
      <h2>Recent Activity in {courseId}</h2>

      <div className={styles.activityItem}>
        <span>📢</span>
        <div>
          <h3>{announcements.length} Announcements</h3>
          <Link to={`/courses/${courseId}/announcements`} className={styles.showMore}>SHOW MORE</Link>
        </div>
      </div>

      <div className={styles.activityItem}>
        <span>📝</span>
        <div>
          <h3>{assignments.length} View Assignments</h3>
          <Link to={`/courses/${courseId}/assignments`} className={styles.showMore}>SHOW MORE</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseStream;
