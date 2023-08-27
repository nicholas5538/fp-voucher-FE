// Place any reusable types in this file
import type { ReactElement, ReactNode } from 'react';

export type voucherFormValues = {
  action: 'Create' | 'Update' | 'Delete';
  category: string;
  description: string;
  discount: number;
  id: string;
  minSpending: number;
  promoCode: string;
  startDate: string;
  expiryDate: string;
};

export type getVouchersData = Omit<
  voucherFormValues,
  'action' | 'startDate' | 'expiryDate'
> & {
  startDate: Date;
  expiryDate: Date;
};

export type getVoucherData = {
  _links: Record<string, string>;
  results: {
    _id: string;
    category: string;
    description: string;
    discount: number;
    minSpending: number;
    promoCode: string;
    startDate: Date;
    expiryDate: Date;
  };
  'X-Total-count': number;
};

export type dataType = {
  _links: Record<string, string>;
  end: number;
  lastPage: number;
  limit: number;
  page: number;
  results: getVouchersData[];
  start: number;
  totalVouchers: number;
  'X-Total-count': number;
};

export type dataReceivedType = Omit<
  voucherFormValues,
  'action' | 'startDate' | 'expiryDate'
> & {
  action?: voucherFormValues['action'];
  startDate: string;
  expiryDate: string;
};

export type childrenNode = {
  children: ReactElement | ReactElement[] | ReactNode;
  className?: string;
};

export type TradioLabels = Record<string, string>;

export type TPagination = {
  offset: string;
  limit: string;
};
