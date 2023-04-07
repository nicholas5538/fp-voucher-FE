import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Tooltip, {
  tooltipClasses,
  type TooltipProps,
} from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { getVouchers } from '../../utils/api';
import { voucherFormValues } from '../../constants/globalTypes';

type CartAmountProps = {
  subTotal: number;
  platformFee: number;
  promoCode: voucherFormValues['promoCode'];
  onRemoveVoucher?: () => void;
};

const StyledIcon = styled(InfoOutlinedIcon)`
  cursor: pointer;
  stroke: white;
  stroke-width: 0.8px;
`;

const StyledTypography = styled(Typography)`
  margin-top: 2px;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
`;

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 220,
    padding: 10,
    backgroundColor: 'rgba(86, 97, 106, 1)',
    fontSize: 14,
  },
});

const CartAmount = ({
  subTotal,
  platformFee,
  promoCode,
  onRemoveVoucher,
}: CartAmountProps) => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ['vouchers', { page: 0, pageSize: 200 }],
    queryFn: ({ signal }) => getVouchers({ page: 0, pageSize: 200, signal }),
  });

  const getVoucherDiscountByPromoCode = (code: string) => {
    const voucher = data?.vouchers.find(({ promoCode }) => promoCode === code);
    return voucher?.discount;
  };

  const voucherDiscount = getVoucherDiscountByPromoCode(promoCode);

  const handleOnClick = () => {
    setOpen((prevState) => !prevState);
  };

  const calculateTotal = () => {
    if (voucherDiscount) return subTotal - (voucherDiscount / 100) * subTotal;
    return subTotal + platformFee;
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' marginBottom={1}>
        <Typography fontWeight={100}>Subtotal</Typography>
        <Typography fontWeight={100}>S$ {subTotal.toFixed(2)}</Typography>
      </Box>
      {voucherDiscount && (
        <Box display='flex' justifyContent='space-between' marginBottom={1}>
          <Box display='flex'>
            <Typography fontWeight={100} marginRight={1}>
              Discount
            </Typography>
            <StyledTypography
              fontWeight={200}
              fontSize={10}
              alignSelf='center'
              color='primary'
              onClick={onRemoveVoucher}
            >
              Remove Voucher
            </StyledTypography>
          </Box>
          <Typography fontWeight={100}>-{voucherDiscount}%</Typography>
        </Box>
      )}
      <Box display='flex' justifyContent='space-between' marginBottom={1}>
        <Box display='flex'>
          <Typography fontWeight={100} marginRight={1}>
            Platform fee
          </Typography>
          <CustomWidthTooltip
            open={open}
            onClose={handleOnClick}
            onOpen={handleOnClick}
            title='This fee goes into providing you better customer care and app experience'
            placement='top-start'
            arrow
          >
            <StyledIcon onClick={handleOnClick} />
          </CustomWidthTooltip>
        </Box>
        <Typography fontWeight={100}>S$ {platformFee.toFixed(2)}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex'>
          <Typography marginRight={1}>
            {voucherDiscount ? 'Total After Disc' : 'Total'}
          </Typography>
          <Typography fontWeight={100} fontSize={10} alignSelf='center'>
            (incl. GST where applicable)
          </Typography>
        </Box>
        <Typography>S$ {calculateTotal().toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartAmount;
