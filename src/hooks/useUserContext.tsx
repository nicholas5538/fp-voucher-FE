import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import type { childrenNode } from '../constants/globalTypes';
import useLogin from './useLogin';
import useRefreshTokens from './useRefreshTokens';
import useLogout from './useLogout';

type UserContextType = {
  cookies: { jwt?: string | undefined };
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
  const [timer, setTimer] = useState(0);
  const [tokenExpiryTime, setTokenExpiryTime] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const login = useLogin({ setCookie, setName, setTokenExpiryTime, setUserId });
  const logout = useLogout({
    removeCookie,
    setName,
    setUserId,
    setTokenExpiryTime,
  });

  useRefreshTokens({
    cookies,
    setName,
    setTimer,
    setTokenExpiryTime,
    timer,
    tokenExpiryTime,
  });

  return (
    <UserContext.Provider value={{ cookies, name, login, logout, userId }}>
      {children}
    </UserContext.Provider>
  );
}
