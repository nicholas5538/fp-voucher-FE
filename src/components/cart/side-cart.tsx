import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styled from 'styled-components';
import CartAmount from './cart-amount';
import CartList from './cart-list';
import CheckoutButton from './checkout-button';
import ToggleSwitch from './toggle-switch';
import VoucherModal from './voucher-modal';

const StyledSendTimeExtensionOutlined = styled(SendTimeExtensionOutlinedIcon)`
  stroke: white;
  stroke-width: 0.8px;
`;

const StyledSideCart = styled(Box)`
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  padding: 4rem 10px 0 10px;
  box-shadow: 0 0.3rem 2rem rgb(0 0 0 / 10%);
`;

const Separator = styled(Box)(() => ({
  borderBottom: '1px solid #e6e6e6',
  margin: '1rem 0',
}));

type SideCartProps = {
  subTotal: number;
};

const SideCart = ({ subTotal }: SideCartProps) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPickUp, setIsPickUp] = useState<boolean>(true);
  const [includeCutlery, setIncludeCutlery] = useState<boolean>(false);
  const handlePromoCode = (code: string | undefined) => {
    setPromoCode(code || '');
  };

  const handleRemoveVoucher = () => {
    setPromoCode('');
  };

  const handleModeSwitchChange = () => {
    setIsPickUp((prevIsPickUp) => !prevIsPickUp);
  };

  const handleCutlerySwitchChange = () => {
    setIncludeCutlery((prevIncludeCutlery) => !prevIncludeCutlery);
  };

  return (
    <StyledSideCart
      sx={{ backgroundColor: 'white', position: 'fixed', top: '64px' }}
      minWidth={350}
      height='100%'
    >
      <Box textAlign='center'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          paddingTop={5}
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
        <Typography fontWeight={600} marginY={5}>
          Your order from Pizza Hut (Westmall)
        </Typography>
      </Box>
      <Box maxHeight={300} sx={{ overflowY: 'auto' }} paddingY={5}>
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
      </Box>
      <Separator marginBottom={20} />

      <VoucherModal
        onPromoCode={handlePromoCode}
        promoCode={promoCode}
        subTotal={subTotal}
      />

      <CartAmount
        subTotal={subTotal}
        platformFee={0.4}
        promoCode={promoCode}
        onRemoveVoucher={handleRemoveVoucher}
      />
      <Box width='300px' paddingTop={10}>
        <CheckoutButton
          onClick={() => {
            console.log('Checkout');
          }}
          height={3}
        />
      </Box>
    </StyledSideCart>
  );
};

export default SideCart;
