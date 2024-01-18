import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import type { childrenNode } from '../constants/globalTypes';
import {
  fetchGoogleProfile,
  fetchGoogleTokens,
  fetchRefreshGoogleTokens,
  fetchJWT,
} from '../utils/api';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

type UserContextType = {
  cookies: Record<string, string>;
  googleTokens: Record<string, string>;
  name: string;
  login(): void;
  logout(): void;
  userId: string;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a USerProvider');
  }
  return context;
}

export default function UserProvider({ children }: childrenNode) {
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
      const { signal } = new AbortController();
      const { access_token, refresh_token, expiry_date } =
        await fetchGoogleTokens(code, signal);

      setGoogleToken({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      setTokenExpiryToken(new Date(expiry_date).getSeconds());

      const { data } = await fetchGoogleProfile(access_token, signal);
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
    },
    onError: (error) => {
      throw new Error(`Login Failed: ${error.error_description}`);
    },
    flow: 'auth-code',
  });
  const logout = useCallback(() => {
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
  }, []);

  useEffect(() => {
    async function fetchRefreshTokens() {
      const { access_token, refresh_token, expiry_date } =
        await fetchRefreshGoogleTokens();
      setGoogleToken({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      return setTokenExpiryToken(new Date(expiry_date).getSeconds());
    }

    if (timer > tokenExpiryTime) {
      fetchRefreshTokens().then(() => setTimer(0));
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
}
