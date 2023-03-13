import DiscountIcon from '@mui/icons-material/Discount';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export const menuItems = [
  {
    Icon: DiscountIcon,
    id: 1,
    url: '/vouchers',
    text: 'Vouchers',
  },
  {
    Icon: NoteAddIcon,
    id: 2,
    url: '/vouchers/create',
    text: 'Create voucher',
  },
  {
    Icon: LogoutRoundedIcon,
    id: 3,
    url: '#',
    text: 'Logout',
  },
];
