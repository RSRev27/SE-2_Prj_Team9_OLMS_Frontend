import React from 'react';
import ToDoItem from './ToDoitem';

const ToDoList = ({ items }) => {
  return (
    <div className="todo-list">
      <h2>To Do</h2>
      {items.map((item, index) => (
        <ToDoItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ToDoList;
