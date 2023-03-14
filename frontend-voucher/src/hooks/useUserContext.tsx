import {
  googleLogout,
  useGoogleLogin,
  type OverridableTokenClientConfig,
  type TokenResponse,
} from '@react-oauth/google';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { childrenNode } from '../constants/globalTypes';

type TuserContext = {
  user:
    | Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
    | undefined;
  givenName: string;
  login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void;
  logout: () => void;
};

const UserContext = createContext(null as unknown as TuserContext);

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: childrenNode) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<
    Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'> | undefined
  >(undefined);
  const [givenName, setGivenName] = useState('');

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      return setUser(tokenResponse);
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
  });

  const logout = () => {
    setGivenName('');
    setUser(undefined);
    googleLogout();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const controller = new AbortController();

    if (user) {
      axios
        .get('https://people.googleapis.com/v1/people/me?personFields=names', {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
          signal: controller.signal,
        })
        .then((res) => {
          setGivenName(res.data.names[0].givenName);
        })
        .catch((err) => console.error(err));
    }

    return () => controller.abort();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, givenName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
