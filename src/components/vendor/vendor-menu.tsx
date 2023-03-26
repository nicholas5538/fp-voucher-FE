import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { AddBox } from '@mui/icons-material';
import StyledTypography from '../styled-typography';

const StyledBox = styled(Box)<{ notlastitem?: string }>`
  background-color: white;

  ${({ notlastitem }) => notlastitem && 'border-bottom: 1px solid #e6e6e6;'}
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

type Props = {
  itemName: string;
  itemNameDescription?: string;
  itemDescription: string;
  itemPrice: string;
  itemDiscountedPrice: string;
  imageUrl: string;
  notlastitem?: string;
};

const VendorMenu = ({
  itemName,
  itemNameDescription,
  itemDescription,
  itemPrice,
  itemDiscountedPrice,
  imageUrl,
  notlastitem,
}: Props) => {
  return (
    <StyledBox paddingX={8} paddingY={6} notlastitem={notlastitem}>
      <ButtonBox
        display='flex'
        textAlign='start'
        justifyContent='space-between'
      >
        <Box>
          <Typography variant='subtitle1' color='black'>
            {itemName} {itemNameDescription && `(${itemNameDescription})`}
          </Typography>
          <StyledTypography variant='body2'>{itemDescription}</StyledTypography>
          <Box display='flex'>
            <Typography variant='subtitle1' color='black' marginRight={2}>
              {itemDiscountedPrice}
            </Typography>
            <StyledTypography
              variant='subtitle1'
              sx={{ textDecoration: 'line-through' }}
            >
              {itemPrice}
            </StyledTypography>
          </Box>
        </Box>
        <Box width='88px' height='88px'>
          <ImageContainer>
            <img src={imageUrl} width='88' height='88' />
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
