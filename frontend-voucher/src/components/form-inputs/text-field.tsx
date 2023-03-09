import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';
import { voucherFormValues } from '../../constants/globalTypes';

type Props<TextFieldProps> = TextFieldProps & {
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
}: Props<TextFieldProps>) => {
  const iProps = props.type === 'number' ? { step: 0.5 } : {};

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
            props.type === 'number'
              ? (Math.round(Number(value) * 100) / 100).toFixed(2)
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
