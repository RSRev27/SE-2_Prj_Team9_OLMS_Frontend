import React from 'react';

const ToDoItem = ({ item }) => {
  return (
    <div className="todo-item">
      <span>{item.title}</span>
      <span>{item.dueDate}</span>
    </div>
  );
};

export default ToDoItem;
