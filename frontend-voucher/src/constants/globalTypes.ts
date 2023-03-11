// Place any reuseable types in this file
import { Dayjs } from 'dayjs';

export type voucherFormValues = {
  action: string;
  category: string;
  description: string;
  discount: number;
  id: string;
  minSpending: number;
  promoCode: string;
  startDate: Dayjs;
  expiryDate: Dayjs;
};

export type dataType = {
  page: number;
  total: number;
  total_pages: number;
  vouchers: voucherFormValues[];
};
