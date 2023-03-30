import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import VoucherIcon from '../../assets/voucher.svg';
import { Close } from '@mui/icons-material';
import PromoCodeField from './promo-code-field';
import { useForm, FormProvider } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getVouchers } from '../../utils/api';
import VoucherCard from './cart-voucher-card';
import { formatDate } from '../../utils/date';
import { Dayjs } from 'dayjs';

const StyledButton = styled(Button)<{ $isDisabled?: boolean }>`
  width: 100%;
  height: 3rem;
  box-shadow: none;
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? 'hsl(334deg 62.94% 59.59%) !important' : ''};
  color: ${({ $isDisabled }) => ($isDisabled ? 'white !important' : '')};
`;

const StyledDialog = styled(Dialog)`
  margin: auto;
`;

const StyledChip = styled(Chip)<{ $isActive: boolean }>`
  margin-left: 0.8rem;
  background-color: ${({ $isActive }) =>
    $isActive ? '#e21b70' : 'transparent'};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'inherit')};
  :hover {
    color: white;
    background-color: rgb(158 18 78) !important;
  }
`;

type FormValues = {
  promoCode?: string;
};

type VoucherModalProps = {
  // eslint-disable-next-line no-unused-vars
  onPromoCode: (code: string | undefined) => void;
  promoCode?: string;
  subTotal: number;
};

type VoucherType = {
  id: string;
  expiryDate: Dayjs;
  promoCode: string;
  discount: number;
  description: string;
  minSpending: number;
};

const VoucherModal: FC<VoucherModalProps> = ({
  onPromoCode,
  promoCode,
  subTotal,
}) => {
  const methods = useForm<FormValues>();
  const { handleSubmit, setValue, setError, resetField, watch } = methods;

  const typedPromoCode = watch('promoCode')?.toUpperCase();

  const [sortMethod, setSortMethod] = useState<'discount' | 'expiryDate'>(
    'discount',
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeChip, setActiveChip] = useState<'discount' | 'expiryDate'>(
    'discount',
  );

  useEffect(() => {
    if (!promoCode) {
      resetField('promoCode');
      // setSelectedVoucher(null); // Reset the selected voucher state
    } else {
      setValue('promoCode', promoCode);
    }
  }, [promoCode, resetField, setValue]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vouchers', { page: 0, pageSize: 20, signal: undefined }],
    queryFn: () => getVouchers({ page: 0, pageSize: 20, signal: undefined }),
  });

  const pickUpVouchers = data?.vouchers.filter(
    (voucher: { category: string }) => voucher.category === 'Pick-up',
  );

  const onSubmit = (data: FormValues) => {
    const { promoCode } = data;
    const isValidVoucher = pickUpVouchers?.find(
      (voucher: VoucherType) => voucher.promoCode === promoCode,
    );

    if (!isValidVoucher) {
      setError('promoCode', {
        type: 'invalid',
        message: 'Voucher Code Not Applicable',
      });
    } else {
      onPromoCode(promoCode || undefined);
      setOpen(false);
    }
  };

  const handleSortMethodChange = (method: 'discount' | 'expiryDate') => {
    setSortMethod(method);
    setActiveChip(method);
  };

  const sortedPickUpVouchers = (vouchers: VoucherType[]) => {
    if (sortMethod === 'discount') {
      return vouchers.sort((a, b) => b.discount - a.discount);
    } else if (sortMethod === 'expiryDate') {
      return vouchers.sort(
        (a, b) =>
          new Date(
            formatDate({
              date: a.expiryDate,
              dateFormat: 'YYYY-MM-DD',
            }),
          ).getTime() -
          new Date(
            formatDate({
              date: b.expiryDate,
              dateFormat: 'YYYY-MM-DD',
            }),
          ).getTime(),
      );
    }

    return vouchers;
  };
  const isMinSpendingNotHit = () => {
    const voucher = pickUpVouchers?.find(
      (v: VoucherType) => v.promoCode === typedPromoCode,
    );
    if (voucher && subTotal < voucher.minSpending) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Box display='flex' marginY={6}>
        <img src={VoucherIcon} alt='Voucher Icon' />
        <Typography
          sx={{ cursor: 'pointer' }}
          color='primary'
          marginLeft={2}
          onClick={handleClickOpen}
        >
          Apply a voucher
        </Typography>
      </Box>
      <StyledDialog open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography>Enter or select a voucher code</Typography>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ height: '28rem', overflowY: 'hidden' }}>
              <Box padding={4}>
                <PromoCodeField
                  subTotal={subTotal}
                  pickUpVouchers={pickUpVouchers}
                />
              </Box>
              <Box
                display='flex'
                marginTop={2}
                alignItems='center'
                paddingBottom={6}
              >
                Sort By:
                <StyledChip
                  label='Discount'
                  variant='outlined'
                  $isActive={activeChip === 'discount'}
                  onClick={() => handleSortMethodChange('discount')}
                />
                <StyledChip
                  label='Expiry Date'
                  variant='outlined'
                  $isActive={activeChip === 'expiryDate'}
                  onClick={() => handleSortMethodChange('expiryDate')}
                />
              </Box>
              <Box
                height='18rem'
                overflow='auto'
                paddingX={1}
                paddingBottom={1}
              >
                {isError ? (
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='100%'
                  >
                    No vouchers available
                  </Box>
                ) : isLoading ? (
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='100%'
                  >
                    <CircularProgress color='primary' />
                  </Box>
                ) : (
                  sortedPickUpVouchers(pickUpVouchers || []).map((voucher) => (
                    <VoucherCard
                      key={voucher.id}
                      id={voucher.id}
                      title={voucher.promoCode}
                      description={voucher.description}
                      expiryDate={formatDate({
                        date: voucher.expiryDate,
                        dateFormat: 'YYYY-MM-DD',
                      })}
                      discount={voucher.discount}
                      minSpending={voucher.minSpending}
                      onSelect={() => {
                        setValue('promoCode', voucher.promoCode);
                        watch('promoCode');
                      }}
                      isSelected={
                        voucher.promoCode === typedPromoCode &&
                        !(subTotal < voucher.minSpending)
                      }
                      isDisabled={subTotal < voucher.minSpending}
                    />
                  ))
                )}
              </Box>
            </DialogContent>

            <DialogActions>
              <StyledButton
                variant='contained'
                onClick={handleSubmit(onSubmit)}
                disabled={isMinSpendingNotHit()}
                $isDisabled={isMinSpendingNotHit()}
              >
                <Typography variant='body2'>Apply</Typography>
              </StyledButton>
            </DialogActions>
          </form>
        </FormProvider>
      </StyledDialog>
    </>
  );
};

export default VoucherModal;
