import React from 'react';
// import { useTodos } from '../../context/TodoContext';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  // const { handleStatusChange } = useTodos();

  // const handleStatusClick = async () => {
  //   try {
  //     await handleStatusChange(todo.id, !todo.completed);
  //   } catch (error) {
  //     console.error('Failed to update todo status:', error);
  //   }
  // };

  return (
    <li className='todo-item'>
      <h3>Title: {todo.title}</h3>
      <p>Description: {todo.description}</p>
      <div className='btns-container'>
        {/* <button className='btn status-btn' onClick={handleStatusClick}>
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button> */}
        <button className='btn delete-btn' onClick={() => onDelete(todo.id)}>Delete</button>
        <button className='btn update-btn' onClick={() => onEdit(todo)}>Edit</button> 
      </div>
    </li>
  );
};

export default TodoItem;
