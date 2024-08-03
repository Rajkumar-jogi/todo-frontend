import React, { useState } from 'react';

import { useTodos } from '../../context/TodoContext'; 

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {handleAdd} = useTodos()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAdd({ title, description });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button className='btn' type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
