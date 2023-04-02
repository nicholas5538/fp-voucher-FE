import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type FormValues = {
  promoCode?: string; // change to optional
};

type VoucherType = {
  id: string;
  expiryDate: Dayjs;
  promoCode: string;
  discount: number;
  description: string;
  minSpending: number;
};

type PromoCodeFieldProps = {
  subTotal: number;
  pickUpVouchers: VoucherType[] | undefined;
};

const PromoCodeField = ({ subTotal, pickUpVouchers }: PromoCodeFieldProps) => {
  const { control } = useFormContext<FormValues>();

  const getHelperText = (
    error: FieldError | undefined,
    promoCode: string | undefined,
  ) => {
    if (error) {
      return error.message;
    }

    const voucher = pickUpVouchers?.find((v) => v.promoCode === promoCode);
    if (voucher && subTotal < voucher.minSpending) {
      return 'Min spending not hit. Please add more items to use voucher';
    }

    return '';
  };
  return (
    <Controller
      name='promoCode'
      control={control}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label='Promo code'
          variant='outlined'
          fullWidth
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          error={!!error}
          helperText={getHelperText(error, value)}
        />
      )}
    />
  );
};

export default PromoCodeField;
