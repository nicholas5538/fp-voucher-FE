import dayjs from 'dayjs';

type formatDateArgs = { date: dayjs.Dayjs | undefined; dateFormat: string };

export const convertToDayjs = (date: string): dayjs.Dayjs => {
  return dayjs(date);
};

// Format date into 'DD MMM YYYY' which translates into '13 Mar 2023'
// Formats can be found here: https://day.js.org/docs/en/display/format
export const formatDate = ({ date, dateFormat }: formatDateArgs): string => {
  if (date === undefined) throw new Error('Date is undefined');
  return dayjs(date).format(dateFormat);
};

// check if voucher expiry date - today's date exceed 3 days
export const calculateDateDifference = (expiryDate: object): boolean => {
  return dayjs(expiryDate as dayjs.Dayjs).diff(dayjs()) > 259200000;
};
