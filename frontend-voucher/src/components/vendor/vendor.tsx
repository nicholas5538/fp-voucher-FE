import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { mockData } from '../vendor/mock-vendor-data';
import { VendorInfo } from '../vendor/vendor-info';
import VendorMenu from '../vendor/vendor-menu';
import { Whatshot } from '@mui/icons-material';

const StyledBox = styled(Box)`
  background-color: white;
`;

const Vendor = () => {
  return (
    <>
      {
        <VendorInfo
          vendorName={mockData.name}
          vendorRatings={mockData.ratings}
          vendorReviewsNumber={mockData.reviewsNumber}
          affordability={mockData.affordability}
          tags={mockData.tags}
        />
      }
      {mockData.categories.map((category) => (
        <StyledBox
          marginTop={2}
          paddingX={6}
          paddingTop={4}
          key={category.name}
        >
          <Box display='flex' alignItems='center'>
            {category.name === 'Popular' ? <Whatshot color='primary' /> : null}
            <Typography variant='h5' fontWeight={600} marginLeft={1}>
              {category.name}
            </Typography>
          </Box>
          <Typography variant='subtitle1' marginLeft={1}>
            {category.description}
          </Typography>
          {category.items.map((item, index) => (
            <VendorMenu
              key={item.name}
              itemName={item.name}
              itemNameDescription={item.name_description}
              itemDescription={item.description}
              itemPrice={item.price}
              itemDiscountedPrice={item.discountedPrice}
              imageUrl={item.imageUrl}
              notlastitem={
                index !== category.items.length - 1 ? 'true' : 'false'
              }
            />
          ))}
        </StyledBox>
      ))}
    </>
  );
};

export default Vendor;
