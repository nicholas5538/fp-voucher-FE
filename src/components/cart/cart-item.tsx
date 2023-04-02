import { Box, Typography, Button } from '@mui/material';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styled } from '@mui/material/styles';
import StyledTypography from '../styled-typography';

type Props = {
  name: string;
  description?: string | null;
  price: number;
  discountedPrice: number;
  quantity: number;
};

const StyledButton = styled(Button)(() => ({
  boxShadow: 'none',
  transition: 'box-shadow 0s ease-in-out',
  '&:hover': {
    boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
}));

const StyledBox = styled(Box)`
  cursor: pointer;
`;

const CartItem = ({
  name,
  description,
  price,
  discountedPrice,
  quantity,
}: Props) => {
  return (
    <StyledBox
      display='flex'
      justifyContent='space-between'
      paddingX={5}
      marginBottom={10}
    >
      <Box display='flex'>
        <Typography color='primary' marginRight={2}>
          {name}
        </Typography>
        <Typography color='primary'>{description}</Typography>
      </Box>
      <Box textAlign='center'>
        <StyledTypography variant='body2'>
          S$ {discountedPrice.toFixed(2)}
        </StyledTypography>
        <StyledTypography
          variant='body2'
          sx={{ textDecoration: 'line-through' }}
        >
          S$ {price.toFixed(2)}
        </StyledTypography>
        <StyledButton>
          <DeleteSweepOutlinedIcon />
          <Typography color='black'>{quantity}</Typography>
          <AddOutlinedIcon />
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

export default CartItem;
