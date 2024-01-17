import axios, { type GenericAbortSignal } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import type { childrenNode } from '../constants/globalTypes';
import { fetchJWT, fetchGoogleProfile } from '../utils/api';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

type TuserContext = {
  cookies: Record<string, string>;
  googleTokens: Record<string, string>;
  name: string;
  login: () => void;
  logout: () => void;
  userId: string;
};


const UserContext = createContext(null as unknown as TuserContext);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: childrenNode) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [googleTokens, setGoogleToken] = useState({
    accessToken: '',
    refreshToken: '',
  });
  const [timer, setTimer] = useState(0);
  const [tokenExpiryTime, setTokenExpiryToken] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const { abort, signal } = new AbortController();
      const { data: tokens } = await axios.post(
        'https://fp-capstone-backend.onrender.com/auth/google',
        {
          code,
        },
        {
          signal,
        },
      );

      setGoogleToken({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
      setTokenExpiryToken(new Date(tokens.expiry_date).getSeconds());
      const { data } = await fetchGoogleProfile(tokens.access_token, signal);
      const email = data.emailAddresses[0].value;
      const { givenName: googleName } = data.names[0];
      // @ts-ignore
      const response = await fetchJWT(email, googleName, signal);

      // Set jwt cookie
      setCookie('jwt', response!.data.access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      });

      setName(googleName);
      setLocalStorageItem('name', name);
      setUserId(response!.data.userId);
      return () => abort();
    },
    onError: (error) => {
      throw new Error(`Login Failed: ${error.error_description}`);
    },
    flow: 'auth-code',
  });
  const logout = () => {
    setGoogleToken({ accessToken: '', refreshToken: '' });
    setTokenExpiryToken(0);
    setName('');
    setUserId('');
    removeCookie('jwt', {
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    sessionStorage.clear();
    localStorage.clear();
    googleLogout();
    return navigate('/');
  };

  useEffect(() => {
    const fetchRefreshTokens = async () => {
      const { data: tokens } = await axios.post(
        'https://fp-capstone-backend.onrender.com/auth/google/refresh-token',
      );
      setGoogleToken({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
      return setTokenExpiryToken(new Date(tokens.expiry_date).getSeconds());
    };

    if (timer > tokenExpiryTime) {
      fetchRefreshTokens().catch((err) => {
        throw new Error(err);
      });
      setTimer(0);
    } else {
      setTimeout(() => setTimer((prevTime) => ++prevTime), 1000);
    }

    const name = getLocalStorageItem('name');
    if (cookies.jwt && name) {
      setName(name);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ cookies, googleTokens, name, login, logout, userId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
