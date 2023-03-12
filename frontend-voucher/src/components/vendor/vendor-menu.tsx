import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { Whatshot, AddBox } from '@mui/icons-material';
import StyledTypography from '../styled-typography';

const StyledBox = styled(Box)`
  background-color: white;
`;

const ButtonBox = styled(Box)`
  cursor: pointer;
`;

const IconContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
`;

const ImageContainer = styled(Box)`
  position: relative;
  margin-right: 1rem;
  width: 88px;
  height: 88px;
`;

const VendorMenu = () => {
  return (
    <StyledBox marginTop={2} paddingX={6} paddingTop={4}>
      <Box display='flex' alignItems='center'>
        <Whatshot color='primary' />
        <Typography variant='h5' fontWeight={600} marginLeft={1}>
          Popular
        </Typography>
      </Box>
      <Box>
        <StyledTypography variant='body2'>
          Most ordered right now.
        </StyledTypography>
      </Box>

      <ButtonBox
        display='flex'
        textAlign='start'
        justifyContent='space-between'
      >
        <Box>
          <Typography variant='subtitle1' color='black'>
            My Box (U.P. $21.80)
          </Typography>
          <StyledTypography variant='body2'>
            1 Personal Pizza + Choice of 2 Sides
          </StyledTypography>
          <Box display='flex'>
            <Typography variant='subtitle1' color='black' marginRight={2}>
              from S$ 7.57
            </Typography>
            <StyledTypography
              variant='subtitle1'
              sx={{ textDecoration: 'line-through' }}
            >
              S$ 8.90
            </StyledTypography>
          </Box>
        </Box>
        <Box width='88px' height='88px'>
          <ImageContainer>
            <img
              src='https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/cd3iw/2835bebfeeb0d295a69ba787593c2708.jpg?width=200'
              alt='Pizza'
              width='88'
              height='88'
            />
            <IconContainer>
              <AddBox color='primary' />
            </IconContainer>
          </ImageContainer>
        </Box>
      </ButtonBox>
    </StyledBox>
  );
};

export default VendorMenu;
