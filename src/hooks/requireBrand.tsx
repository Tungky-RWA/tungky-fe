import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem('token'); // atau pakai context / state management

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;