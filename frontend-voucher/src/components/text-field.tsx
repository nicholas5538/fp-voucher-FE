import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Controller } from 'react-hook-form';

type Props<TextFieldProps> = TextFieldProps & {
  control: any;
  icon: JSX.Element;
  label: string;
  name: string;
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
              ? (Math.round(value * 100) / 100).toFixed(2)
              : value
          }
          onChange={onChange}
          required
          {...props}
        />
      )}
    />
  );
};

export default TextFieldComponent;
