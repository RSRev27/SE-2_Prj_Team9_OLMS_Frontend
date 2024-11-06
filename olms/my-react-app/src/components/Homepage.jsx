import React from 'react';
import Sidebar from './SideNav';
import Dashboard from './Dashboard';
import ToDoList from './ToDoList';
import './HomePage.css'
import ai from './Ai.jpg'
import s from './se.jpg'
import ScrollProgress from './ScrollProg';
const HomePage = () => {
  const courses = [
    { id:'ai',image: ai, title: 'Artificial Intelligence', description: 'Works on different parts of AI' },
    { id:'se2',image: s, title: 'Software Engineering', description: 'Different processes SDLC models' },
  ];

  const toDoItems = [
    { title: 'Assignment P1', dueDate: 'Oct 9, 11:59 PM' },
    { title: 'Coming Up Quiz-4', dueDate: 'Oct 21, 11:59 PM' },
  ];

  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-content">
        <Dashboard courses={courses} />
        <ToDoList items={toDoItems} />
        <ScrollProgress/>
      </div>
    </div>
  );
};

export default HomePage;
