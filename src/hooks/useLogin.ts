import type { Dispatch, SetStateAction } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import type { CookieSetOptions } from '../constants/globalTypes';
import { fetchGoogleProfile, fetchGoogleTokens, fetchJWT } from '../utils/api';
import { setLocalStorageItem } from '../utils/localStorage';
import type { User } from './useUserContext';

type LoginProps = {
  setCookie: (
    name: 'jwt',
    value: any,
    options?: CookieSetOptions | undefined,
  ) => void;
  setUserInfo: Dispatch<SetStateAction<User>>;
};
export default function useLogin({ setCookie, setUserInfo }: LoginProps) {
  return useGoogleLogin({
    onSuccess: async ({ code }) => {
      const { signal } = new AbortController();
      const { access_token, refresh_token, expiry_date } =
        await fetchGoogleTokens(code, signal);

      const { data } = await fetchGoogleProfile(access_token, signal);
      const email = data.emailAddresses[0].value;
      const { givenName } = data.names[0];
      // @ts-ignore
      const response = await fetchJWT(email, givenName, signal);

      // Set jwt cookie
      setCookie('jwt', response!.data.access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      });

      setUserInfo({
        name: givenName,
        userId: response!.data.userId,
        tokenExpiryTime: new Date(expiry_date).getSeconds(),
      });
      setLocalStorageItem('name', givenName);
    },
    onError: (error) => {
      throw new Error(`Login Failed: ${error.error_description}`);
    },
    flow: 'auth-code',
  });
}
