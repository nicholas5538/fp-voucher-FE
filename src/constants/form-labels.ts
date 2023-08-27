import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { TradioLabels, voucherFormValues } from './globalTypes';

export const actionLabels: TradioLabels = {
  update: 'Update',
  delete: 'Delete',
};

export const categoryLabels: TradioLabels = {
  delivery: 'Delivery',
  'dine-in': 'Dine-in',
  pandago: 'Pandago',
  pandamart: 'Pandamart',
  'pick-up': 'Pick-up',
};

export const createDefaultValues: voucherFormValues = {
  action: 'Create',
  category: categoryLabels.delivery,
  description: '',
  discount: 5,
  id: uuidv4(),
  minSpending: 0,
  promoCode: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  expiryDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
};
