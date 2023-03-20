import { Navigate } from 'react-router-dom';
import { childrenNode } from '../constants/globalTypes';
import { getLocalStorageItem } from '../utils/localStorage';

const ProtectedRoute = ({ children }: childrenNode) => {
  const accessToken = getLocalStorageItem('token');

  if (!accessToken) return <Navigate to='/' replace={true} />;

  return children;
};

export default ProtectedRoute;
