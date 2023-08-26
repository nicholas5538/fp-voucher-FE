import type { Dispatch, SetStateAction } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setLocalStorageItem } from '../utils/localStorage';

type useLoginFn = {
  email: string;
  givenName: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setGivenName: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

const setCookie = (jwt: string, daysToExpire: number) => {
  const expirationDate = new Date(
    new Date().getTime() + daysToExpire * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `jwt=${jwt}; expires="${expirationDate}; path=/"`;
  return;
};

const useLogin = ({
  email,
  givenName,
  setEmail,
  setGivenName,
  setToken,
}: useLoginFn) => {
  return useGoogleLogin({
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
        .then((res) => {
          const { names, emailAddresses } = res.data;
          setGivenName(names[0].givenName);
          setEmail(emailAddresses[0].value);
          return setLocalStorageItem('name', givenName);
        })
        .catch((err) => console.error(err));

      // Generate JWT and set cookie
      axios
        .post('https://fp-capstone-backend.onrender.com/user', {
          email,
          name: givenName,
        })
        .then((res) => {
          return setCookie(res.data.token, 7);
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
};

export default useLogin;
