import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from '../utils/localStorage';

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const loggedInUser = getLocalStorageItem('user');
  const name = getLocalStorageItem('name');

  if (!loggedInUser && !name) return <Navigate to='/' replace={true} />;

  return children;
};

export default ProtectedRoute;
