import axios from 'axios';
import { voucherFormValues, dataType } from '../constants/globalTypes';
import { AxiosError } from 'axios';

export const getVouchers = async (
  options: {
    page: number;
    pageSize: number;
    signal: AbortSignal | undefined;
  },
  voucherId?: string,
) => {
  const url = '/mock_vouchers.json';
  const startIndex = options.page * options.pageSize;
  let results: dataType = {
    page: 0,
    total: 0,
    totalPages: 0,
    vouchers: [],
  };
  let endIndex = (options.page + 1) * options.pageSize;

  const { data } = await axios
    .get(url, { signal: options.signal })
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        throw new Error('Bad request');
      } else {
        throw new Error(`Request failed. Status: ${reason.response?.status}`);
      }
    });

  if (voucherId)
    return data.vouchers.find(({ id }: Pick<voucherFormValues, 'id'>) => {
      return id === voucherId;
    });

  const total = data.vouchers.length;
  const total_pages = Math.floor(data.vouchers.length / options.pageSize);
  const per_page = Math.floor(total / total_pages);

  if (total < endIndex) {
    endIndex = total - 1;
  }

  const dataObject = {
    page: options.page + 1,
    total: total,
    totalPages: total_pages,
    perPage: per_page === Infinity ? data.vouchers.length : per_page,
  };
  results = {
    ...dataObject,
    vouchers: data.vouchers.slice(startIndex, endIndex),
  };

  return results;
};
