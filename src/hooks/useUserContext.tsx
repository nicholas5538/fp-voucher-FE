import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { childrenNode } from '../constants/globalTypes';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';

type TuserContext = {
  cookies: Record<string, string>;
  givenName: string;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext(null as unknown as TuserContext);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: childrenNode) => {
  const [givenName, setGivenName] = useState('');
  const [email, setEmail] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const controller = new AbortController();
      axios
        .get(
          'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: 'application/json',
            },
            signal: controller.signal,
          },
        )
        .then(async (res) => {
          const { names, emailAddresses } = res.data;
          setGivenName(names[0].givenName);
          setEmail(emailAddresses[0].value);
          setLocalStorageItem('name', names[0].givenName);
          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          );
          const { data } = await axios.post(
            'https://fp-capstone-backend.onrender.com/user',
            {
              email,
              name: names[0].displayName,
            },
            {
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal,
            },
          );
          return setCookie('jwt', data.token, {
            expires,
            path: '/',
            secure: true,
          });
        })
        .catch((err) => console.error(err));
      return () => controller.abort();
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });
  const logout = () => {
    setGivenName('');
    removeCookie('jwt', {
      path: '/',
      secure: true,
    });
    sessionStorage.clear();
    localStorage.clear();
    googleLogout();
    return navigate('/');
  };

  useEffect(() => {
    const name = getLocalStorageItem('name');
    if (cookies.jwt && name) {
      setGivenName(name);
    }
  }, []);

  return (
    <UserContext.Provider value={{ cookies, givenName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
