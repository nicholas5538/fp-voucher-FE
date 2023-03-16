import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Switch,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from 'styled-components';
import ToggleSwitch from './toggle-switch';
import { useState } from 'react';
import { SendTimeExtensionOutlined } from '@mui/icons-material';

import CartList from './cart-list';
import CheckoutButton from './checkout-button';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CartAmount from './cart-amount';
import VoucherModal from './voucher-modal';

type CartModalProps = {
  open: boolean;
  onClose: () => void;
};

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: white;
  box-shadow: 0 0.3rem 2rem rgb(0 0 0 / 10%);
  padding: 0.3rem;
  width: 2rem;
  height: 2rem;
`;

const Separator = styled(Box)(() => ({
  borderBottom: '1px solid #e6e6e6',
  margin: '1rem 0',
}));

const StyledSendTimeExtensionOutlined = styled(SendTimeExtensionOutlined)`
  stroke: white;
  stroke-width: 0.8px;
`;

const CartModal = ({ open, onClose }: CartModalProps) => {
  const [isPickUp, setIsPickUp] = useState<boolean>(true);
  const [includeCutlery, setIncludeCutlery] = useState<boolean>(false);

  const handleModeSwitchChange = () => {
    setIsPickUp((prevIsPickUp) => !prevIsPickUp);
  };

  const handleCutlerySwitchChange = () => {
    setIncludeCutlery((prevIncludeCutlery) => !prevIncludeCutlery);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={{ maxWidth: '100vw' }}>
      <Box textAlign='center'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop={10}
        >
          <Typography
            fontWeight={100}
            sx={{
              color: isPickUp ? 'inherit' : '#e21b70',
            }}
          >
            Delivery
          </Typography>
          <ToggleSwitch onChange={handleModeSwitchChange} />
          <Typography
            fontWeight={100}
            sx={{
              color: isPickUp ? '#e21b70' : 'inherit',
            }}
          >
            Pick-up
          </Typography>
        </Box>
        <StyledSendTimeExtensionOutlined />
        <Typography variant='body2' fontWeight={100}>
          20 mins
        </Typography>
      </Box>
      <DialogContent>
        <CartList />
        <Separator />
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Box display='flex'>
              <LocalDiningIcon color='primary' />
              <Typography fontWeight={500} marginLeft={2}>
                Do you really need cutlery?
              </Typography>
            </Box>

            <Typography fontWeight={200} color='gray' marginLeft={8}>
              {includeCutlery
                ? 'Yes. The restaurant will include cutlery and/or straws, if available.'
                : 'No Cutlery, please. Thank you for saving the world :)'}
            </Typography>
          </Box>
          <Box>
            <Switch
              onChange={handleCutlerySwitchChange}
              checked={includeCutlery}
            />
          </Box>
        </Box>
        <Separator />
        <VoucherModal />
        <CartAmount subTotal={44.17} platformFee={0.4} />
      </DialogContent>

      <DialogActions>
        <StyledCloseButton onClick={onClose}>
          <Close />
        </StyledCloseButton>
        <CheckoutButton
          onClick={() => {
            console.log('Checkout clicked');
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;
