import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../lib/api';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(getAuthToken());
  const isVerified = localStorage.getItem('storedIsVerified') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-otp" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
