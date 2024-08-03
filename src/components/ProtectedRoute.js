import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element }) => {
  const jwtToken = Cookies.get('jwt_token');
  
  return jwtToken ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;