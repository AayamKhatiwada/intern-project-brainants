import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext, UserContextInterface } from '../Context/UserContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // const isAuthenticated = useSelector((state: RootInterface) => state.user.user);

  const { userState } = useContext<UserContextInterface>(UserContext);
  const isAuthenticated = userState.user

  return (
    isAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute;

