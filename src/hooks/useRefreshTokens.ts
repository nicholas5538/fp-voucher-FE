import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { fetchRefreshGoogleTokens } from '../utils/api';
import { getLocalStorageItem } from '../utils/localStorage';

type RefreshTokens = {
  cookies: { jwt?: string };
  setName: Dispatch<SetStateAction<string>>;
  setTimer: Dispatch<SetStateAction<number>>;
  setTokenExpiryTime: Dispatch<SetStateAction<number>>;
  timer: number;
  tokenExpiryTime: number;
};

export default function useRefreshTokens(props: RefreshTokens) {
  const {
    cookies,
    setName,
    setTimer,
    setTokenExpiryTime,
    timer,
    tokenExpiryTime,
  } = props;

  useEffect(() => {
    async function getRefreshTokens() {
      const { expiry_date } = await fetchRefreshGoogleTokens();
      return setTokenExpiryTime(new Date(expiry_date).getSeconds());
    }

    if (timer > tokenExpiryTime) {
      getRefreshTokens().then(() => setTimer(0));
    } else {
      setTimeout(() => setTimer((prevTime) => ++prevTime), 1000);
    }

    const name = getLocalStorageItem('name');
    if (cookies.jwt && name) {
      setName(name);
    }
  }, []);
}
