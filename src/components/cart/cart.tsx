import Box from '@mui/material/Box';
import { useState } from 'react';
import Vendor from '../vendor/vendor';
import CartButton from './cart-button';
import CartModal from './cart-modal';
import SideCart from './side-cart';
import useTitle from '../../hooks/useTitle';

const Cart = () => {
  useTitle('foodpanda Checkout Page');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const subTotalAmount = 44.17;

  return (
    <Box display='flex' width='100vw'>
      <Box marginRight='352px'>
        <Vendor />
        <Box className='block lg:hidden'>
          <CartButton
            onClick={handleCartButtonClick}
            subTotal={subTotalAmount}
          />
          <CartModal
            open={isModalOpen}
            onClose={handleCloseModal}
            subTotal={subTotalAmount}
          />
        </Box>
      </Box>
      <Box className='hidden lg:block'>
        <SideCart subTotal={subTotalAmount} />
      </Box>
    </Box>
  );
};

export default Cart;
