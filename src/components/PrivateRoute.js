// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While loading the authentication state, don't render anything
  if (loading) {
    return <div>Loading...</div>;  // You can show a loader here if you prefer
  }

  // If no user is logged in, navigate to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
