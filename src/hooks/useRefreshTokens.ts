import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { fetchRefreshGoogleTokens } from '../utils/api';
import { getLocalStorageItem } from '../utils/localStorage';
import type { User } from './useUserContext';

type RefreshTokens = {
  cookies: { jwt?: string };
  setUserInfo: Dispatch<SetStateAction<User>>;
  tokenExpiryTime: number;
};

export default function useRefreshTokens(props: RefreshTokens) {
  const { cookies, setUserInfo, tokenExpiryTime } = props;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    async function getRefreshTokens() {
      const { expiry_date } = await fetchRefreshGoogleTokens();
      setUserInfo((prevState) => {
        return {
          ...prevState,
          tokenExpiryTime: new Date(expiry_date).getSeconds(),
        };
      });
    }

    if (timer > tokenExpiryTime) {
      getRefreshTokens().then(() => setTimer(0));
    } else {
      setTimeout(() => setTimer((prevTime) => ++prevTime), 1000);
    }

    const name = getLocalStorageItem('name');
    if (cookies.jwt && name) {
      setUserInfo((prevState) => {
        return { ...prevState, name };
      });
    }
  }, []);
}
