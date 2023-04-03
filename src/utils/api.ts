import axios, { AxiosError, AxiosResponse } from 'axios';
import { type NavigateFunction } from 'react-router-dom';
import {
  createVoucherValues,
  dataType,
  voucherFormValues,
  queryFnSignal,
} from '../constants/globalTypes';
import { formatDate } from './date';

type getVoucherFn = {
  id: string | undefined;
  signal: queryFnSignal['signal'];
};

type dataReceivedType = Partial<createVoucherValues>;

type apiSubmitArgs = {
  data: Partial<voucherFormValues>;
  navigate: NavigateFunction;
};

const db_id = import.meta.env.VITE_SHEET_DB_ID;
const archive_id = import.meta.env.VITE_SHEET_ARCHIVE_ID;
const baseURL = 'https://sheetdb.io/api/v1/';
const timeout = 5000;
const contentType = 'application/json';

const googleSheet = axios.create({
  baseURL,
  timeout,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SHEET_DB_TOKEN}`,
    Accept: contentType,
    'Content-Type': contentType,
  },
});

const archiveSheet = axios.create({
  baseURL,
  timeout,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_SHEET_ARCHIVE_TOKEN}`,
    Accept: contentType,
    'Content-Type': contentType,
  },
});

const wrapperFn = async (
  callBack: Promise<AxiosResponse<voucherFormValues[]>>,
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
  signal: queryFnSignal['signal'];
}): Promise<dataType | undefined> => {
  const { page, pageSize, signal } = options;
  const startIndex = page * pageSize;
  let endIndex = (page + 1) * pageSize;

  const data = await wrapperFn(
    googleSheet.get(`${db_id}/`, { signal: signal }),
  );

  if (data) {
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

    const results = {
      ...dataObject,
      vouchers: data.slice(startIndex, endIndex + 1),
    };

    return results;
  }

  return data;
};

export const getVoucher = async ({ id, signal }: getVoucherFn) => {
  const data = await wrapperFn(
    googleSheet.get(`${db_id}/search?id=${id}`, { signal: signal }),
  );

  if (data) return data[0];
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
