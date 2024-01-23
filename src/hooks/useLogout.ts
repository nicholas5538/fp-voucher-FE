import { Dispatch, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import type { CookieSetOptions } from '../constants/globalTypes';
import { initialState, type User } from './useUserContext';

type LogoutProps = {
  removeCookie: (name: 'jwt', options?: CookieSetOptions | undefined) => void;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

export default function useLogout({ removeCookie, setUserInfo }: LogoutProps) {
  return useCallback(() => {
    removeCookie('jwt', {
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    setUserInfo(initialState);
    sessionStorage.clear();
    localStorage.clear();
    googleLogout();
  }, []);
}
