import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Button, { ButtonProps } from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MouseEventHandler } from 'react';

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: 'hsl(334, 79%, 48%)',
      disabled: 'hsl(0, 4%, 50%)',
    },
    secondary: {
      main: 'hsl(334, 79%, 48%)',
    },
  },
});

type Props<ButtonProps> = (ButtonProps | LoadingButtonProps) & {
  disabled?: boolean;
  endIcon: React.ReactNode;
  isLoadingButton: boolean;
  isSubmitting?: boolean;
  label: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ButtonComponent = ({
  disabled,
  endIcon,
  isLoadingButton,
  isSubmitting,
  label,
  onClick,
}: Props<ButtonProps>) => {
  return (
    <ThemeProvider theme={theme}>
      {isLoadingButton ? (
        <LoadingButton
          color='secondary'
          disabled={disabled ?? false}
          endIcon={endIcon}
          loading={isSubmitting}
          loadingPosition='end'
          onClick={onClick}
          size='small'
          type='submit'
          variant='outlined'
        >
          {label}
        </LoadingButton>
      ) : (
        <Button
          color='secondary'
          disabled={disabled ?? false}
          endIcon={endIcon}
          onClick={onClick}
          size='small'
          type='button'
          variant='outlined'
        >
          {label}
        </Button>
      )}
    </ThemeProvider>
  );
};

export default ButtonComponent;
