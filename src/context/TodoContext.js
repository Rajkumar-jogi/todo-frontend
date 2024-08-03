import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchTodos, createTodo, deleteTodo, updateTodo, updateTodoStatus } from '../services/api'; 
import Cookies from 'js-cookie';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const jwtToken = Cookies.get('jwt_token');

  const loadTodos = useCallback(async () => {
    try {
      const data = await fetchTodos(jwtToken);
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError('Failed to fetch todos. Please try again.');
    }
  }, [jwtToken]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleAdd = async (newTodo) => {
    try {
      const { id } = await createTodo(jwtToken, newTodo);
      const createdTodo = { id, ...newTodo };
      setTodos(prevTodos => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(jwtToken, id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      const responseData = await updateTodo(jwtToken, updatedTodo.id, updatedTodo);
      console.log('Response data in handleUpdate function: ', responseData);
  
      const { id } = responseData.todo;
  
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id.toString() === id ? { ...todo, ...responseData.todo } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? 0 : 1; // Toggle status
      const updatedTodoResponse = await updateTodoStatus(jwtToken, id, { completed: newStatus });
  
      if (updatedTodoResponse && updatedTodoResponse.todo && updatedTodoResponse.todo.completed !== undefined) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id.toString() === id.toString()
              ? { ...todo, completed: updatedTodoResponse.todo.completed === 1 } // Convert number to boolean
              : todo
          )
        );
      } else {
        console.error('Unexpected response format:', updatedTodoResponse);
      }
    } catch (error) {
      console.error('Failed to update todo status:', error);
      setError('Failed to update todo status. Please try again.');
    }
  };
  
  

  return (
    <TodoContext.Provider value={{ todos, error, handleAdd, handleDelete, handleUpdate, handleStatusChange }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => React.useContext(TodoContext);
