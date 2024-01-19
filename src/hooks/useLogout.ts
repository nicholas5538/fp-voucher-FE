import { Dispatch, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import type { CookieSetOptions } from '../constants/globalTypes';

type LogoutProps = {
  removeCookie: (name: 'jwt', options?: CookieSetOptions | undefined) => void;
  setName: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
  setTokenExpiryTime: Dispatch<SetStateAction<number>>;
};

export default function useLogout({
  removeCookie,
  setName,
  setUserId,
  setTokenExpiryTime,
}: LogoutProps) {
  const navigate = useNavigate();

  return useCallback(() => {
    removeCookie('jwt', {
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    setTokenExpiryTime(0);
    setName('');
    setUserId('');
    sessionStorage.clear();
    localStorage.clear();
    googleLogout();
    return navigate('/');
  }, []);
}
