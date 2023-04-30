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
    staleTime: 5 * 1000,
    cacheTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
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
        <Typography className='font-thin'>Subtotal</Typography>
        <Typography className='font-thin'>S$ {subTotal.toFixed(2)}</Typography>
      </Box>
      {voucherDiscount && (
        <Box className='mb-2 flex justify-between'>
          <Box className='flex'>
            <Typography className='mr-2 font-thin'>Discount</Typography>
            <Typography
              className='mt-4 cursor-pointer self-center text-[10px] font-extralight hover:font-medium'
              onClick={onRemoveVoucher}
            >
              Remove Voucher
            </Typography>
          </Box>
          <Typography className='font-thin'>-{voucherDiscount}%</Typography>
        </Box>
      )}
      <Box className='mb-2 flex justify-between'>
        <Box className='flex'>
          <Typography className='mr-2 font-thin'>Platform fee</Typography>
          <CustomWidthTooltip
            open={open}
            onClose={handleOnClick}
            onOpen={handleOnClick}
            title='This fee goes into providing you better customer care and app experience'
            placement='top-start'
            arrow
          >
            <InfoOutlinedIcon
              className='cursor-pointer stroke-white stroke-[0.8px]'
              onClick={handleOnClick}
            />
          </CustomWidthTooltip>
        </Box>
        <Typography className='font-thin'>
          S$ {platformFee.toFixed(2)}
        </Typography>
      </Box>
      <Box className='flex justify-between'>
        <Box className='flex'>
          <Typography className='mr-px'>
            {voucherDiscount ? 'Total After Disc' : 'Total'}
          </Typography>
          <Typography className='self-center text-[10px] font-thin'>
            (incl. GST where applicable)
          </Typography>
        </Box>
        <Typography>S$ {calculateTotal().toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartAmount;
