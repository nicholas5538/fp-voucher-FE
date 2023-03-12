import axios from 'axios';
import { voucherFormValues, dataType } from '../constants/globalTypes';

export const getVouchers = async (
  options: {
    page: number;
    pageSize: number;
  },
  voucherId?: string
) => {
  const controller = new AbortController();
  const url = '/mock_vouchers.json';
  const startIndex = options.page * options.pageSize;
  let results: dataType = {
    page: 0,
    total: 0,
    total_pages: 0,
    vouchers: [],
  };
  let endIndex = (options.page + 1) * options.pageSize;

  try {
    const { data } = await axios({
      method: 'get',
      url: url,
      signal: controller.signal,
    });

    if (voucherId)
      return data.vouchers.find(
        ({ id }: Pick<voucherFormValues, 'id'>) => id === voucherId
      );

    const total = data.vouchers.length;
    const total_pages = Math.floor(data.vouchers.length / options.pageSize);
    const per_page = Math.floor(total / total_pages);

    if (total < endIndex) {
      endIndex = total - 1;
    }

    const dataObject = {
      page: options.page + 1,
      total: total,
      total_pages: total_pages,
      per_page: per_page === Infinity ? data.vouchers.length : per_page,
    };
    results = {
      ...dataObject,
      vouchers: data.vouchers.slice(startIndex, endIndex),
    };
    controller.abort();
  } catch (error) {
    console.error(error);
  }

  return results;
};
