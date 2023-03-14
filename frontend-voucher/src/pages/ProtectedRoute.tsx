import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { user } = useUserContext();

  if (!user) return <Navigate to='/' replace={true} />;

  return children;
};

export default ProtectedRoute;
