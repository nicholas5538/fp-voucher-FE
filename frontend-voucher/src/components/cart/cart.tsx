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

  return (
    <>
      <Box display='flex' width='100vw'>
        <Box>
          <Vendor />
          <StyledModalBox>
            <CartButton onClick={handleCartButtonClick} />
            <CartModal open={isModalOpen} onClose={handleCloseModal} />
          </StyledModalBox>
        </Box>
        <StyledBox>
          <SideCart />
        </StyledBox>
      </Box>
    </>
  );
};

export default Cart;
