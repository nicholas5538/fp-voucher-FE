import dayjs from 'dayjs';

// check if voucher expiry date - today's date exceed 3 days
export const calculateDateDifference = (expiryDate: object): boolean => {
  return dayjs(expiryDate as dayjs.Dayjs).diff(dayjs()) > 259200000;
};

// Format date into 'DD MMM YYYY' which translates into '13 Mar 2023'
export const formatVoucherDate = (expiryDate: dayjs.Dayjs): string => {
  return expiryDate.format('DD MMM YYYY');
};
