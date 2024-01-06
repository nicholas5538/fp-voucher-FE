import dayjs from 'dayjs';
import { TradioLabels, voucherFormValues } from './globalTypes';

export const actionLabels: TradioLabels = {
  update: 'Update',
  delete: 'Delete',
};

export const categoryLabels: TradioLabels = {
  delivery: 'Delivery',
  dine: 'Dine',
  pandago: 'Pandago',
  pandamart: 'Pandamart',
  pickup: 'Pickup',
};

export const createDefaultValues: voucherFormValues = {
  action: 'Create',
  category: categoryLabels.delivery,
  description: '',
  discount: 5,
  minSpending: 0,
  promoCode: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  expiryDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
};
