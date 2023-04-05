// Place any reuseable types in this file
import { type Dayjs } from 'dayjs';

export type voucherFormValues = {
  action: 'Create' | 'Update' | 'Delete';
  category: string;
  description: string;
  discount: number;
  id: string;
  minSpending: number;
  promoCode: string;
  startDate: Dayjs;
  expiryDate: Dayjs;
};

export type dataReceivedType = Omit<
  voucherFormValues,
  'action' | 'startDate' | 'expiryDate'
> & {
  action?: voucherFormValues['action'];
  startDate: string;
  expiryDate: string;
};

export type dataType = {
  page: number;
  total: number;
  totalPages: number;
  vouchers: dataReceivedType[];
};

export type childrenNode = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
};

export type TradioLabels = {
  [key: string]: string;
};
