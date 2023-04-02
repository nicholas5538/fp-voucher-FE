import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  height?: number;
};

const StyledButton = styled(Button)<{ height: number }>`
  width: 100%;
  height: ${(props) => `${props.height}rem`};
  box-shadow: none;
  margin: 1rem;
`;

const CheckoutButton = ({ onClick, height = 4 }: Props) => {
  return (
    <StyledButton variant='contained' onClick={onClick} height={height}>
      <Typography sx={{ color: 'white' }} variant='body2'>
        Go to checkout
      </Typography>
    </StyledButton>
  );
};

export default CheckoutButton;
