import axios, { AxiosError, type AxiosResponse } from 'axios';
import { type NavigateFunction } from 'react-router-dom';
import {
  dataReceivedType,
  dataType,
  voucherFormValues,
} from '../constants/globalTypes';
import { formatDate } from './date';

type apiSubmitArgs = {
  data: voucherFormValues;
  navigate: NavigateFunction;
};

type getVoucherFn = ({
  id,
  signal,
}: {
  id: voucherFormValues['id'];
  signal: Tsignal['signal'];
}) => Promise<dataReceivedType | undefined>;

type getVouchersFn = (options: {
  page: number;
  pageSize: number;
  signal: Tsignal['signal'];
}) => Promise<dataType | undefined>;

type Tsignal = {
  signal: AbortSignal | undefined;
};

const dbId = import.meta.env.VITE_SHEET_DB_ID;
const archiveId = import.meta.env.VITE_SHEET_ARCHIVE_ID;
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
  callBack: Promise<AxiosResponse<dataReceivedType[]>>,
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

export const getVouchers: getVouchersFn = async (options) => {
  const { page, pageSize, signal } = options;
  const startIndex = page * pageSize;
  let endIndex = (page + 1) * pageSize;

  const data = await wrapperFn(googleSheet.get(`${dbId}/`, { signal: signal }));

  if (data) {
    const total = data.length;
    const totalPages = Math.floor(data.length / pageSize);
    const perPage = Math.floor(total / totalPages);

    if (total < endIndex) {
      endIndex = total - 1;
    }

    const dataObject = {
      page,
      total,
      totalPages,
      perPage: perPage === Infinity ? data.length : perPage,
    };

    return {
      ...dataObject,
      vouchers: data.slice(startIndex, endIndex + 1),
    };
  }

  return data;
};

export const getVoucher: getVoucherFn = async ({ id, signal }) => {
  const data = await wrapperFn(
    googleSheet.get(`${dbId}/search?id=${id}`, { signal: signal }),
  );

  if (data) return data[0];
  return data;
};

const createVoucher = (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  void wrapperFn(googleSheet.post(`${dbId}/`, dataReceived));
};

const updateVoucher = (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  void wrapperFn(
    googleSheet.put(`${dbId}/id/${dataReceived.id}`, dataReceived),
  );
};

const deleteVoucher = (dataReceived: dataReceivedType) => {
  void wrapperFn(googleSheet.delete(`${dbId}/id/${dataReceived.id}`));
  void wrapperFn(archiveSheet.post(`${archiveId}/`, dataReceived));
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
      deleteVoucher(modifiedData);
      break;
    default:
      createVoucher(modifiedData);
  }

  setTimeout(() => navigate('/vouchers', { replace: true }), 4000);
};
