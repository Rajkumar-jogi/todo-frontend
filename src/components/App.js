import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import TodoList from '../components/Todos/TodoList';
import Navbar from '../components/Navbar';
import PrivateRoute from '../components/ProtectedRoute'; // Import the PrivateRoute component
import '../../src/App.css';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Home/>} />
          <Route path="/todos" element={<PrivateRoute element={TodoList} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
