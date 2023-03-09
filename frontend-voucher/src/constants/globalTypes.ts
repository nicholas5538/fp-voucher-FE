// Place any reuseable types in this file
import { Dayjs } from 'dayjs';

export type voucherFormValues = {
  action: string;
  category: string;
  description: string;
  minSpending: number;
  startDate: Dayjs;
  expiryDate: Dayjs;
};
