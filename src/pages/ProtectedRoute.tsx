import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '../utils/localStorage';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = getLocalStorageItem('token');

  if (!accessToken) return <Navigate to='/' replace={true} />;

  return children;
};

export default ProtectedRoute;
