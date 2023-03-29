import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { ReactComponent as CartLogo } from '../../assets/cart2.svg';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  subTotal:number;
}

const StyledBox = styled(Box)`
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding: 1rem;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  height: 6rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 4rem;
  box-shadow: none;
  justify-content: space-between;
`;

const CartButton: React.FC<Props> = ({ onClick,subTotal }) => {
  return (
    <>
      <StyledBox>
        <StyledButton variant='contained' onClick={onClick}>
          <Box display='flex'>
            <CartLogo />
            <Typography marginLeft={1} alignSelf='center' variant='caption'>
              3
            </Typography>
          </Box>
          <Typography variant='body2' fontFamily=''>
            Review Pick-Up order
          </Typography>
          <Typography fontWeight={100} variant='body2'>
         S${subTotal}
          </Typography>
        </StyledButton>
      </StyledBox>
    </>
  );
};

export default CartButton;
