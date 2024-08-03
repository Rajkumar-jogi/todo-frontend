import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext'; // Adjust the path
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import EditTodoModal from './EditTodoModal'; // Import the EditTodoModal component

import '../../styles/todos.css';

const TodoList = () => {
  const { todos, handleDelete } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  console.log('todoslist in todoList component: ', todos);

  return (
    <div className='main'>
      <div className='todo-form-container'>
        <h2 style={{ color: "#000" }}>Add Todo Form</h2>
        <TodoForm/>
      </div>
      <div className='todo-list-container'>
        <h2>Todo List</h2>
        
        {todos.length === 0 ? (
          <h3>No Todos Yet, Add Todos...!</h3>
        ) : (
          <ul className='todos-list'>
            {todos.map(todo => (
              <TodoItem 
                key={todo.id}  // Ensure todo.id is unique
                todo={todo} 
                onDelete={handleDelete} 
                onEdit={openModal}  // Pass the function to open the modal
              />
            ))}
          </ul>
        )}
      </div>
      {selectedTodo && (
        <EditTodoModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          todo={selectedTodo}
        />
      )}
    </div>
  );
};

export default TodoList;
