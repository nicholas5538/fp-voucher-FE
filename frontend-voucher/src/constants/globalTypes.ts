// Place any reuseable types in this file
import { Dayjs } from 'dayjs';

export type voucherFormValues = {
  action: string;
  category: string;
  description: string;
  discount: number;
  minSpending: number;
  promoCode: string;
  startDate: Dayjs;
  expiryDate: Dayjs;
};
