import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [cookies, removeCookie] = useCookies(['jwt']);
  const location = useLocation();

  if (!cookies.jwt) return <Navigate to='/' replace={true} />;

  useEffect(() => {
    const cookieExists = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('jwt='));

    if (cookieExists) {
      // Parse the cookie string to get the expiration date
      const cookieString = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('jwt='));
      const expirationDate = new Date(
        (cookieString as string).split('expires=')[1],
      );

      // Compare the expiration date with the current date
      if (expirationDate < new Date()) {
        removeCookie('jwt', {
          path: '/',
          secure: true,
        });
      }
    }
  }, [location]);

  return children;
};

export default ProtectedRoute;
