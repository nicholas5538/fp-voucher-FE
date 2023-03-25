import axios, { type AxiosError } from 'axios';
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

  const { data } = await googleSheet
    .get(`${db_id}/`, { signal: signal })
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });

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
    vouchers: data.slice(startIndex, endIndex),
  };

  return results;
};

export const getVoucher = async ({ id, signal }: getVoucherFn) => {
  const { data } = await googleSheet
    .get(`${db_id}/search?id=${id}`, { signal: signal })
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });

  return data[0];
};

export const createVoucher = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await googleSheet
    .post(`${db_id}/`, dataReceived)
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });
};

export const updateVoucher = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await googleSheet
    .put(`${db_id}/id/${dataReceived.id}`, dataReceived)
    .then(() => console.log(`Voucher id ${dataReceived.id} has been updated`))
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });
};

export const deleteVoucher = async (id: string) => {
  await googleSheet
    .delete(`${db_id}/id/${id}`)
    .then(() => console.log('Voucher has been deleted'))
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });
};

export const createVoucherArchive = async (dataReceived: dataReceivedType) => {
  delete dataReceived.action;
  await archiveSheet
    .post(`${archive_id}/`, dataReceived)
    .then(() => console.log('Deleted voucher has been added to the archive'))
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });
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
