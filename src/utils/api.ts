import axios, { AxiosError, AxiosResponse } from 'axios';
import { type NavigateFunction } from 'react-router-dom';
import {
  createVoucherValues,
  dataType,
  voucherFormValues,
} from '../constants/globalTypes';
import { formatDate } from './date';

type getVoucherFn = {
  id: string | undefined;
  signal: AbortSignal | undefined;
};

type dataReceivedType = Partial<createVoucherValues>;

type apiSubmitArgs = {
  data: Partial<voucherFormValues>;
  navigate: NavigateFunction;
};

const db_id = import.meta.env.VITE_SHEET_DB_ID;
const archive_id = import.meta.env.VITE_SHEET_ARCHIVE_ID;

const googleSheet = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SHEET_DB_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const archiveSheet = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/',
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SHEET_ARCHIVE_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const wrapperFn = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callBack: Promise<AxiosResponse<any, any>>,
) => {
  try {
    const response = await callBack;
    return response.data;
  } catch (reason: unknown) {
    if (reason instanceof AxiosError) {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    } else {
      console.error(reason);
    }
  }
};

export const getVouchers = async (options: {
  page: number;
  pageSize: number;
  signal: AbortSignal | undefined;
}) => {
  const { page, pageSize, signal } = options;
  const startIndex = page * pageSize;
  let results: dataType = {
    page: 0,
    total: 0,
    totalPages: 0,
    vouchers: [],
  };
  let endIndex = (page + 1) * pageSize;

  const data = await wrapperFn(
    googleSheet.get(`${db_id}/`, { signal: signal }),
  );

  const total = data.length;
  const total_pages = Math.floor(data.length / pageSize);
  const per_page = Math.floor(total / total_pages);

  if (total < endIndex) {
    endIndex = total - 1;
  }

  const dataObject = {
    page: page + 1,
    total: total,
    totalPages: total_pages,
    perPage: per_page === Infinity ? data.length : per_page,
  };
  results = {
    ...dataObject,
    vouchers: data.slice(startIndex, endIndex + 1),
  };

  return results;
};

export const getVoucher = async ({ id, signal }: getVoucherFn) => {
  const data = await wrapperFn(
    googleSheet.get(`${db_id}/search?id=${id}`, { signal: signal }),
  );

  return data[0];
};

export const createVoucher = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await wrapperFn(googleSheet.post(`${db_id}/`, dataReceived));
};

export const updateVoucher = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await wrapperFn(
    googleSheet.put(`${db_id}/id/${dataReceived.id}`, dataReceived),
  );
};

export const deleteVoucher = async (id: string) => {
  await wrapperFn(googleSheet.delete(`${db_id}/id/${id}`));
};

export const createVoucherArchive = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await wrapperFn(archiveSheet.post(`${archive_id}/`, dataReceived));
};

export const apiSubmitHandler = ({ data, navigate }: apiSubmitArgs) => {
  const modifiedData = {
    ...data,
    startDate: formatDate({
      date: data.startDate,
      dateFormat: 'YYYY-MM-DD',
    }),
    expiryDate: formatDate({
      date: data.expiryDate,
      dateFormat: 'YYYY-MM-DD',
    }),
  };

  switch (data.action) {
    case 'Update':
      updateVoucher(modifiedData);
      break;
    case 'Delete':
      createVoucherArchive(modifiedData);
      deleteVoucher(modifiedData.id ?? '');
      break;
    default:
      createVoucher(modifiedData);
  }

  setTimeout(() => navigate('/vouchers', { replace: true }), 4000);
};
