import axios, {
  AxiosError,
  type AxiosResponse,
  type GenericAbortSignal,
} from 'axios';
import type {
  dataReceivedType,
  dataType,
  getVoucherData,
  voucherFormValues,
} from '../constants/globalTypes';
import dayjs from 'dayjs';

type modifyDataArgs = {
  data: Partial<voucherFormValues>;
  token: string;
};

type apiSubmitArgs = modifyDataArgs & {
  action: voucherFormValues['action'] | undefined;
};

type googleTokens = {
  msg: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expiry_date: string;
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

const wrapperFn = async <T>(callback: Promise<AxiosResponse<T>>) => {
  const { data } = await callback.catch((reason: unknown) => {
    if (reason instanceof AxiosError) {
      if (reason.response?.status === 400) throw new Error('Bad request');
      throw new Error(`Request failed. Status: ${reason.response?.status}`);
    }
    throw new Error(`Something went wrong. Reason: ${reason}`);
  });
  return data;
};

export const fetchGoogleTokens = (
  code: string,
  signal: GenericAbortSignal | undefined,
) => {
  return wrapperFn<googleTokens>(
    axios.post(
      'https://fp-capstone-backend.onrender.com/auth/google',
      {
        code,
      },
      {
        signal,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    ),
  );
};

export const fetchRefreshGoogleTokens = () => {
  const url = baseURL + 'auth/google/refresh-token';
  return wrapperFn<googleTokens>(axios.post(url));
};

export const fetchGoogleProfile = async (
  accessToken: string,
  signal: GenericAbortSignal | undefined,
) => {
  const url =
    'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses';
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    signal,
  });
};

export const fetchJWT = async (
  email: string,
  name: string,
  signal: GenericAbortSignal | undefined,
) => {
  return await axios
    .post(
      baseURL + 'user',
      {
        email,
        name,
      },
      {
        withCredentials: true,
        signal,
      },
    )
    .catch((reason) => {
      if (reason instanceof AxiosError) {
        if (reason.response?.status === 400) throw new Error('Bad request');
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
      throw new Error(`Something went wrong. Reason: ${reason}`);
    });
};

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

const createVoucher = (data: Partial<dataReceivedType>, token: string) => {
  void wrapperFn(
    fpBackend.post(`api/v1/vouchers`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
};

const updateVoucher = (
  data: Partial<dataReceivedType>,
  token: string,
  voucherId: string,
) => {
  void wrapperFn(
    fpBackend.patch(`api/v1/vouchers/${voucherId}`, data, {
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

export const modifyData = ({ data, token }: modifyDataArgs) => {
  const { action, startDate, expiryDate, id } = data;
  delete data.action;

  if (expiryDate || startDate) {
    data.expiryDate = dayjs(data.expiryDate).add(1, 'day').toISOString();
    data.startDate = dayjs(data.startDate).add(1, 'day').toISOString();
  }

  return apiSubmitHandler({ action, data, token });
};

const apiSubmitHandler = ({ action, data, token }: apiSubmitArgs) => {
  const { id } = data;
  switch (action) {
    case 'Create':
      return createVoucher(data, token);
    case 'Update':
      delete data.id;
      return updateVoucher(data, token, id ?? '');
    default:
      sessionStorage.clear();
      return deleteVoucher(id ?? '', token);
  }
};
