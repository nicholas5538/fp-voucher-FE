// Place any reuseable types in this file
import { Dayjs } from 'dayjs';

export type voucherFormValues = {
  action: string;
  category: string;
  description: string;
  discount: number;
  minSpending: number;
  startDate: Dayjs;
  expiryDate: Dayjs;
};
