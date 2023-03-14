import {
  googleLogout,
  useGoogleLogin,
  type OverridableTokenClientConfig,
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
  token: string | undefined;
  givenName: string;
  login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void;
  logout: () => void;
};

const UserContext = createContext(null as unknown as TuserContext);

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: childrenNode) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [givenName, setGivenName] = useState('');
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
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
      setToken(tokenResponse.access_token);
      setLocalStorageItem('token', tokenResponse.access_token);
      return () => controller.abort();
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const logout = () => {
    setGivenName('');
    setToken(undefined);
    googleLogout();
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const accessToken = getLocalStorageItem('token');
    const name = getLocalStorageItem('name');

    if (accessToken && name) {
      setToken(accessToken);
      setGivenName(name);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, givenName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
