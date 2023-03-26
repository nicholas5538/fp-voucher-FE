import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FC } from 'react';

type FormValues = {
  promoCode?: string; // change to optional
};

const PromoCodeField: FC = () => {
  const { control } = useFormContext<FormValues>();

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
          helperText={error ? 'Invalid promo code' : ''}
        />
      )}
    />
  );
};

export default PromoCodeField;
