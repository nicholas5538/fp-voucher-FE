import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { type MouseEventHandler } from 'react';
import CartLogo from '../../assets/cart2.svg?react';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  subTotal: number;
};

const CartButton = ({ onClick, subTotal }: Props) => {
  return (
    <>
      <Box className='fixed bottom-0 h-24 w-screen bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]'>
        <Button
          className='h-16 w-full justify-between shadow-none'
          variant='contained'
          onClick={onClick}
        >
          <Box className='flex'>
            <CartLogo />
            <Typography
              className='ml-4 self-center'
              marginLeft={1}
              alignSelf='center'
              variant='caption'
            >
              3
            </Typography>
          </Box>
          <Typography variant='body2' fontFamily=''>
            Review Pick-Up order
          </Typography>
          <Typography className='font-thin' variant='body2'>
            S${subTotal}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default CartButton;
