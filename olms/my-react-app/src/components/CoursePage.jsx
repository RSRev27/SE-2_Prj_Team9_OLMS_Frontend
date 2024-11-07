import React from 'react';
import { useParams,Link } from 'react-router-dom';
import courseData from './courseData';
import styles from './CoursePage.module.css';

const CoursePage = () => {
  const { courseId } = useParams();
  const course = courseData[courseId];

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className={styles['course-page']}>
      <div className={styles['main-content']}>
        <br/>
        <h1>{course.term}</h1>
        <h1>{course.title}</h1>

        <section className={styles.section}>
          <h3>Lectures:</h3>
          <p>{course.lectures}</p>
        </section>

        <section className={styles.section}>
          <h3>Office Hours:</h3>
          <p><strong>{course.officeHours.instructor}</strong>, {course.officeHours.email}</p>
          <p>{course.officeHours.hours}</p>
          <p><strong>GTA:</strong> {course.officeHours.gta.name}, {course.officeHours.gta.email}</p>
          <p>{course.officeHours.gta.hours}</p>
        </section>

        <section className={styles.section}>
          <h3>The mode of teaching:</h3>
          <p>{course.modeOfTeaching}</p>
          <p>{course.instructions}</p>
        </section>
      </div>

      <div className={styles.actions}>
      <Link to={`/courses/${courseId}/stream`}><button>View Course Stream</button></Link>
      <Link to={`/courses/${courseId}/modules`}><button>Modules</button></Link>
        <Link to={`/courses/${courseId}/assignments`}><button>Assignments</button></Link>
        <Link to={`/courses/${courseId}/grades`}><button>View Course Grades</button></Link>
        <Link to={`/courses/${courseId}/announcements`}><button>View Course Announcements</button></Link>
      </div>

      <div className={styles.todo}>
        <h3>To Do</h3>
        <ul>
        <li><a href={`/courses/${courseId}/assignments`}>Assignment 1</a> - {course.title}</li>
        <li><a href={`/courses/${courseId}/assignments`}>Assignment 2</a> - {course.title}</li>

        </ul>
      </div>
    </div>
  );
};

export default CoursePage;