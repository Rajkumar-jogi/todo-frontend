import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import Cookies from 'js-cookie';

import '../../styles/auth.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'http://localhost:4000/api/users/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        Cookies.set('jwt_token', data.token, { expires: 30 });
        navigate('/todos');
      } else {
        setShowSubmitError(true);
        setErrorMsg(data.error_msg);
      }
    } catch (error) {
      setShowSubmitError(true);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/todos" />;
  }

  return (
    <>
      <h2 style={{color: "#fff"}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </>
  );
};

export default Login;
