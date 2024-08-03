import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

import '../../styles/auth.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password, email });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMsg(error.response?.data?.message || 'Registration failed. Please try again.'); // Extracting error message
    }
  };

  return (
    <>
      <h2 style={{color: "#fff"}}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='email'>Email: </label>
          <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        <button className='btn' type="submit">Register</button>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>} {/* Conditionally rendering the error message */}
      </form>
    </>
  );
};

export default Register;
