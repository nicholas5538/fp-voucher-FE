import type { Dispatch, SetStateAction } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

type useLogoutFn = {
  setGivenName: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};
const useLogout = ({ setGivenName, setToken }: useLogoutFn) => {
  const navigate = useNavigate();
  setGivenName('');
  setToken(undefined);
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  sessionStorage.clear();
  localStorage.clear();
  googleLogout();
  return navigate('/');
};

export default useLogout;
