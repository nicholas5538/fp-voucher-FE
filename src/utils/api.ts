import axios, { AxiosError, type AxiosResponse, type GenericAbortSignal } from 'axios';
import type { NavigateFunction } from 'react-router-dom';
import type {
  dataReceivedType,
  dataType,
  getVoucherData,
  voucherFormValues,
} from '../constants/globalTypes';
import dayjs from 'dayjs';

type apiSubmitArgs = {
  data: voucherFormValues | Pick<voucherFormValues, 'action' | 'id'>;
  navigate: NavigateFunction;
  token: string;
};

type getVouchersFn = (options: {
  offset: number;
  limit: number;
  signal: AbortSignal | undefined;
  token: string;
}) => Promise<dataType | undefined>;

const baseURL = 'https://fp-capstone-backend.onrender.com/';
const timeout = 5000;
const contentType = 'application/json';

const fpBackend = axios.create({
  baseURL,
  timeout,
  headers: {
    Accept: contentType,
    'Content-Type': contentType,
  },
});

const wrapperFn = async <T>(callBack: Promise<AxiosResponse<T>>) => {
  const { data } = await callBack.catch((reason: unknown) => {
    if (reason instanceof AxiosError) {
      if (reason.response?.status === 400) throw new Error('Bad request');
      throw new Error(`Request failed. Status: ${reason.response?.status}`);
    }
    throw new Error(`Something went wrong. Reason: ${reason}`);
  });
  return data;
};

export async function fetchGoogleProfile(
  accessToken: string,
  signal: GenericAbortSignal | undefined,
) {
  const url = 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses';
  return await axios.get(
    'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      signal,
    },
  );
}

export async function fetchJWT(
  email: string,
  name: string,
  signal: GenericAbortSignal | undefined,
) {
  return await axios
    .post(
      baseURL + 'user',
      {
        email,
        name,
      },
      {
        withCredentials: true,
        signal },
    )
    .catch((reason) => {
      if (reason instanceof AxiosError) {
        if (reason.response?.status === 400) throw new Error('Bad request');
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
      throw new Error(`Something went wrong. Reason: ${reason}`);
    });
}

export const getVouchers: getVouchersFn = (options) => {
  const { offset, limit, signal, token } = options;
  const url = `api/v1/vouchers?offset=${offset}&limit=${limit}`;
  return wrapperFn<dataType>(
    fpBackend.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    }),
  );
};

export const getVoucher = async ({
  id,
  signal,
  token,
}: {
  id: string;
  signal: AbortSignal | undefined;
  token: string;
}) => {
  const data = await wrapperFn<getVoucherData>(
    fpBackend.get(`api/v1/vouchers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    }),
  );
  return data ?? {};
};

const createVoucher = (
  dataReceived: Partial<dataReceivedType>,
  token: string,
) => {
  delete dataReceived.action;
  void wrapperFn(
    fpBackend.post(`api/v1/vouchers`, dataReceived, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
};

const updateVoucher = (
  dataReceived: Partial<dataReceivedType>,
  token: string,
) => {
  const id = dataReceived.id;
  delete dataReceived.action;
  delete dataReceived.id;
  void wrapperFn(
    fpBackend.patch(`api/v1/vouchers/${id}`, dataReceived, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
};

const deleteVoucher = (id: string, token: string) => {
  void wrapperFn(
    fpBackend.delete(`api/v1/vouchers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
};

export const apiSubmitHandler = ({ data, navigate, token }: apiSubmitArgs) => {
  setTimeout(() => navigate('/vouchers', { replace: true }), 4000);
  if (
    'expiryDate' in data &&
    (data.action === 'Create' || data.action === 'Update')
  ) {
    const modifiedData = {
      ...data,
      startDate: dayjs(data.startDate).toISOString(),
      expiryDate: dayjs(data.expiryDate).toISOString(),
    };
    return data.action === 'Create'
      ? createVoucher(modifiedData, token)
      : updateVoucher(modifiedData, token);
  }

  sessionStorage.clear();
  return deleteVoucher(data.id!, token);
};
