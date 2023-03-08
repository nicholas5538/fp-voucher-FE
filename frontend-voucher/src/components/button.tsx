import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import Button, { ButtonProps } from '@mui/material/Button';
import { MouseEventHandler, ReactNode } from 'react';

type Props<ButtonProps> = (ButtonProps | LoadingButtonProps) & {
  disabled?: boolean;
  endIcon: ReactNode;
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
  return isLoadingButton ? (
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
  );
};

export default ButtonComponent;
