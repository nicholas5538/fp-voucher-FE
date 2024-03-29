import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Button, { ButtonProps } from '@mui/material/Button';
import { type MouseEventHandler } from 'react';

type ButtonComponentProps = (ButtonProps | LoadingButtonProps) & {
  isLoadingButton: boolean;
  isSubmitting?: boolean;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ButtonComponent = ({
  isLoadingButton,
  isSubmitting,
  label,
  onClick,
  ...props
}: ButtonComponentProps) => {
  return isLoadingButton ? (
    <LoadingButton
      color='secondary'
      loading={isSubmitting}
      loadingPosition='start'
      onClick={onClick}
      size='small'
      type='submit'
      variant='outlined'
      {...props}
    >
      {label}
    </LoadingButton>
  ) : (
    <Button
      color='secondary'
      onClick={onClick}
      size='small'
      type='button'
      variant='outlined'
      {...props}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
