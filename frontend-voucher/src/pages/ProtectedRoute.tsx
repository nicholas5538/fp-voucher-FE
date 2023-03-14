import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '../utils/localStorage';

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const accessToken = getLocalStorageItem('token');

  if (!accessToken) return <Navigate to='/' replace={true} />;

  return children;
};

export default ProtectedRoute;
