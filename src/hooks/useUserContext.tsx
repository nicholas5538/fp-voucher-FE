import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import type { childrenNode } from '../constants/globalTypes';
import useLogin from './useLogin';
import useRefreshTokens from './useRefreshTokens';
import useLogout from './useLogout';

export type User = {
  name: string;
  userId: string;
  tokenExpiryTime: number;
};

type UserContextType = {
  cookies: { jwt?: string | undefined };
  userInfo: User;
  login(): void;
  logout(): void;
};

export const initialState: User = {
  name: '',
  userId: '',
  tokenExpiryTime: 0,
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
  const [userInfo, setUserInfo] = useState<User>(initialState);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const login = useLogin({ setCookie, setUserInfo });
  const logout = useLogout({
    removeCookie,
    setUserInfo,
  });

  useRefreshTokens({
    cookies,
    setUserInfo,
    tokenExpiryTime: userInfo.tokenExpiryTime,
  });

  return (
    <UserContext.Provider value={{ cookies, userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
