import { Box } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import Vendor from '../vendor/vendor';
import CartButton from './cart-button';
import CartModal from './cart-modal';
import SideCart from './side-cart';

const StyledBox = styled(Box)`
  @media (max-width: 959.95px) {
    display: none;
  }
`;

const StyledModalBox = styled(Box)`
  @media (min-width: 960px) {
    display: none;
  }
`;

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCartButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const subTotalAmount = 44.17;

  return (
    <>
      <Box display='flex' width='100vw'>
        <Box marginRight='352px'>
          <Vendor />
          <StyledModalBox>
            <CartButton
              onClick={handleCartButtonClick}
              subTotal={subTotalAmount}
            />
            <CartModal
              open={isModalOpen}
              onClose={handleCloseModal}
              subTotal={subTotalAmount}
            />
          </StyledModalBox>
        </Box>
        <StyledBox>
          <SideCart subTotal={subTotalAmount} />
        </StyledBox>
      </Box>
    </>
  );
};

export default Cart;
