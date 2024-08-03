import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTodos } from '../../context/TodoContext';

Modal.setAppElement('#root');



const EditTodoModal = ({ isOpen, onRequestClose, todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const {handleUpdate} = useTodos()

  const handleSave = async () => {
    try {
      const updatedTodo = { ...todo, title, description };
      console.log('updated Todo: ', updatedTodo)
      handleUpdate(updatedTodo);  // Notify parent component about the updated todo
      onRequestClose();  // Close the modal
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Todo"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Edit Todo</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='btns-container'>
          <button type="button" className='btn' onClick={handleSave}>Save</button>
          <button type="button" className='btn' onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
