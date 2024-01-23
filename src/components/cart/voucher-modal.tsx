import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import VoucherIcon from '../../assets/voucher.svg';
import type { getVouchersData } from '../../constants/globalTypes';
import { useUserContext } from '../../hooks/useUserContext';
import { getVouchers } from '../../utils/api';
import VoucherCard from './cart-voucher-card';
import PromoCodeField from './promo-code-field';

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
  promoCode?: FormValues['promoCode'];
  subTotal: number;
};

type VoucherFilter = 'discount' | 'expiryDate';

const VoucherModal = ({
  onPromoCode,
  promoCode,
  subTotal,
}: VoucherModalProps) => {
  const methods = useForm<FormValues>();
  const { handleSubmit, setValue, setError, resetField, watch } = methods;
  const [sortMethod, setSortMethod] = useState<VoucherFilter>('discount');
  const [activeChip, setActiveChip] = useState<VoucherFilter>('discount');
  const [open, setOpen] = useState(false);
  const { cookies } = useUserContext();

  const typedPromoCode = watch('promoCode')?.toUpperCase();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!promoCode) {
      resetField('promoCode');
    } else {
      setValue('promoCode', promoCode);
    }
  }, [promoCode, resetField, setValue]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vouchers', { offset: 0, limit: 100, token: cookies.jwt! }],
    queryFn: ({ signal }) =>
      getVouchers({ offset: 0, limit: 100, signal, token: cookies.jwt! }),
  });

  const pickUpVouchers = data?.results.filter(
    ({ category }) => category === 'Pick-up',
  );

  const findVoucher = (code: string | undefined) =>
    pickUpVouchers?.find(({ promoCode }) => promoCode === code);

  const onSubmit = (data: FormValues) => {
    const { promoCode } = data;
    const isValidVoucher = findVoucher(promoCode);

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

  const handleSortMethodChange = (method: VoucherFilter) => {
    setSortMethod(method);
    setActiveChip(method);
  };

  const sortedPickUpVouchers = (vouchers: getVouchersData[]) => {
    switch (sortMethod) {
      case 'discount':
        return vouchers.sort((a, b) => b.discount - a.discount);
      case 'expiryDate':
        return vouchers.sort((a, b) =>
          dayjs(a.expiryDate).isAfter(dayjs(b.expiryDate)) ? 1 : -1,
        );
      default:
        return vouchers;
    }
  };

  const isMinSpendingNotHit = () => {
    const voucher = findVoucher(typedPromoCode);
    return !!(voucher && subTotal < voucher.minSpending);
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
                  <CloseIcon />
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
                  sortedPickUpVouchers(pickUpVouchers ?? []).map(
                    ({
                      id,
                      discount,
                      description,
                      expiryDate,
                      minSpending,
                      promoCode,
                    }) => (
                      <VoucherCard
                        key={id}
                        id={id}
                        title={promoCode}
                        description={description}
                        expiryDate={expiryDate}
                        discount={discount}
                        minSpending={minSpending}
                        onSelect={() => {
                          setValue('promoCode', promoCode);
                          watch('promoCode');
                        }}
                        isSelected={
                          promoCode === typedPromoCode &&
                          !(subTotal < minSpending)
                        }
                        isDisabled={subTotal < minSpending}
                      />
                    ),
                  )
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
