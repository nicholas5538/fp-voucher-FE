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
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';

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
  const [user, setUser] = useState<
    Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'> | undefined
  >(undefined);
  const [givenName, setGivenName] = useState('');
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const controller = new AbortController();
      axios
        .get('https://people.googleapis.com/v1/people/me?personFields=names', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json',
          },
          signal: controller.signal,
        })
        .then((res) => {
          setGivenName(res.data.names[0].givenName);
          setLocalStorageItem('name', res.data.names[0].givenName);
        })
        .catch((err) => console.error(err));
      setUser(tokenResponse);
      setLocalStorageItem('user', JSON.stringify(tokenResponse));
      return () => controller.abort();
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
  });

  const logout = () => {
    setGivenName('');
    setUser(undefined);
    localStorage.clear();
    googleLogout();
    navigate('/', { replace: true });
  };

  console.log(user);

  useEffect(() => {
    const loggedInUser = getLocalStorageItem('user');
    const name = getLocalStorageItem('name');

    if (loggedInUser && name) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setGivenName(name);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, givenName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
