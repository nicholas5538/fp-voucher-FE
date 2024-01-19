import type { Dispatch, SetStateAction } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import type { CookieSetOptions } from '../constants/globalTypes';
import { fetchGoogleProfile, fetchGoogleTokens, fetchJWT } from '../utils/api';
import { setLocalStorageItem } from '../utils/localStorage';

type LoginProps = {
  setCookie: (
    name: 'jwt',
    value: any,
    options?: CookieSetOptions | undefined,
  ) => void;
  setTokenExpiryTime: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
};
export default function useLogin({
  setCookie,
  setName,
  setTokenExpiryTime,
  setUserId,
}: LoginProps) {
  return useGoogleLogin({
    onSuccess: async ({ code }) => {
      const { signal } = new AbortController();
      const { access_token, refresh_token, expiry_date } =
        await fetchGoogleTokens(code, signal);

      setTokenExpiryTime(new Date(expiry_date).getSeconds());

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

      setName(givenName);
      setLocalStorageItem('name', givenName);
      setUserId(response!.data.userId);
    },
    onError: (error) => {
      throw new Error(`Login Failed: ${error.error_description}`);
    },
    flow: 'auth-code',
  });
}
