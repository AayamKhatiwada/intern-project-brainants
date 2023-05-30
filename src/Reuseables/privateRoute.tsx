import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootInterface } from '../store/store';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const isAuthenticated = useSelector((state: RootInterface) => state.user.user);

  return (
    isAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute;

