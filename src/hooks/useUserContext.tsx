import axios, { type GenericAbortSignal } from 'axios';
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

const getGoogleToken = async (
  url: string,
  accessToken: string,
  signal: GenericAbortSignal | undefined,
) =>
  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    signal,
  });

const getJwt = async (url: string, email: string, name: string) =>
  await axios.post(url, {
    email,
    name,
  });

const UserContext = createContext(null as unknown as TuserContext);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: childrenNode) => {
  const [givenName, setGivenName] = useState('');
  const [email, setEmail] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { abort, signal } = new AbortController();
      const { data } = await getGoogleToken(
        'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
        tokenResponse.access_token,
        signal,
      );
      const { names, emailAddresses } = data;

      setGivenName(names[0].givenName);
      setEmail(emailAddresses[0].value);
      setLocalStorageItem('name', givenName);
      setLocalStorageItem('token', tokenResponse.access_token);

      // Generate JWT and set cookie
      const { data: jwt } = await getJwt(
        'https://fp-capstone-backend.onrender.com/user',
        email,
        givenName,
      );
      const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

      setCookie('jwt', jwt.token, {
        expires,
        path: '/',
        secure: true,
      });
      return () => abort();
    },
    onError: (error) => {
      throw new Error(`Login Failed: ${error.error_description}`);
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
