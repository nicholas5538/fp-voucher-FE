import { ReactComponent as PandaPay } from '../../assets/pandapay.svg';
import { ReactComponent as PandaPro } from '../../assets/pandapro.svg';

export const menuItems = [
  {
    id: 1,
    url: '#',
    element: <PandaPay />,
  },
  {
    id: 2,
    url: '#',
    element: <PandaPro />,
  },
  {
    id: 3,
    url: '#',
    element: 'Orders & reordering',
  },
  {
    id: 4,
    url: '/vouchers',
    element: 'Vouchers',
  },
  {
    id: 5,
    url: '/vouchers/create',
    element: 'Create voucher',
  },
  {
    id: 6,
    url: '#',
    element: 'Logout',
  },
];
