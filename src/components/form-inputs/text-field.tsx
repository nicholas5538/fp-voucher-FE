import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';
import { voucherFormValues } from '../../constants/globalTypes';

type TextFieldComponentProps = TextFieldProps & {
  control: Control<voucherFormValues>;
  icon: JSX.Element;
  label: string;
  name: keyof voucherFormValues;
};

const TextFieldComponent = ({
  control,
  icon,
  label,
  name,
  ...props
}: TextFieldComponentProps) => {
  const iProps =
    props.type === 'number' && name === 'minSpending'
      ? { step: 0.5 }
      : name !== 'minSpending'
        ? { step: 1 }
        : {};

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          id='outlined-controlled fullWidth'
          color='secondary'
          inputProps={iProps}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>{icon}</InputAdornment>
            ),
          }}
          label={label}
          value={
            props.type === 'number' && name === 'minSpending'
              ? (Math.round(Number(value) * 100) / 100).toFixed(2)
              : typeof value === 'string' && name === 'promoCode'
                ? value.toUpperCase()
                : value
          }
          onChange={onChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'hsl(334, 79%, 58%)',
              },
            },
          }}
          required
          {...props}
        />
      )}
    />
  );
};

export default TextFieldComponent;
