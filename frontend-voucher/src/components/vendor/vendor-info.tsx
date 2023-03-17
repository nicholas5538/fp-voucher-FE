import { ReactComponent as InfoIcon } from '../../assets/info-icon.svg';
import styled from 'styled-components';
import { Box, Button, Chip, Typography } from '@mui/material';
import { GroupAddOutlined, AttachMoney, Star } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import StyledTypography from '../styled-typography';
import React from 'react';

type Props = {
  vendorName: string;
  vendorRatings: string;
  vendorReviewsNumber: number;
  affordability: number;
  tags: string[];
};

const GroupAddButton = styled(Button)(() => ({
  minWidth: '2rem',
  padding: '0.2rem',
  marginRight: '1rem',
  height: '42px',
  '&:hover': {
    backgroundColor: '#fdf2f7',
    boxShadow: 'none',
    '& > svg': {
      fill: '#e21b70',
    },
  },
}));

const StyledInfoBox = styled(Box)`
  background-color: white;

  @media (min-width: 960px) {
    flex-grow: 1;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  color: #767676;
  font-weight: 100;
  font-size: 0.9rem;
`;

const StyledLi = styled.li`
  margin-left: 1.3rem;
`;

const StyledDistance = styled(Typography)`
  font-weight: 600;
`;

export const VendorInfo = ({
  vendorName,
  vendorRatings,
  vendorReviewsNumber,
  tags,
  affordability,
}: Props) => {
  const affordabilityIcons = [];
  for (let i = 0; i < affordability; i++) {
    affordabilityIcons.push(
      <AttachMoney
        fontSize='small'
        style={{
          fontSize: 'medium',
          color: yellow[800],
          marginRight: '-5',
        }}
      />,
    );
  }
  return (
    <Box>
      <img
        data-testid='hero-banner-image'
        className='vendor-responsive-banner__image'
        srcSet='https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=400&height=100&quality=45 400w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=600&height=150&quality=45 600w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=800&height=200&quality=45 800w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1000&height=250&quality=45 1000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1200&height=300&quality=45 1200w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1600&height=400&quality=45 1600w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=2000&height=500&quality=45 2000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=2500&height=625&quality=45 2500w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=3000&height=750&quality=45 3000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=3500&height=875&quality=45 3500w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=4000&height=1000&quality=45 4000w,'
        src='https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg'
        sizes='(min-width:960px) calc(100vw - 352px),100vw'
        alt='Pizza Hut (West Mall) hero banner'
      />
      <StyledInfoBox paddingTop={5} paddingBottom={6} paddingX={6}>
        <Box display='flex' justifyContent='space-between'>
          <h2>{vendorName}</h2>
          <Box display='flex'>
            <GroupAddButton
              variant='contained'
              color='primary'
              sx={{ boxShadow: 'none' }}
            >
              <GroupAddOutlined />
            </GroupAddButton>
            <Box marginY='auto'>
              <InfoIcon />
            </Box>
          </Box>
        </Box>
        <Box display='flex' alignItems='center'>
          <Chip
            label='SAVE 5% ON PICK-UP!'
            size='small'
            color='primary'
            sx={{ marginRight: 1 }}
          />
          <Star sx={{ color: yellow[800] }} />
          <Typography variant='body2' color='black' marginRight={1}>
            {vendorRatings}
          </Typography>
          <Typography variant='caption' color='grey' marginTop={0.3}>
            {vendorReviewsNumber > 1000 ? '(1000+)' : vendorReviewsNumber}
          </Typography>
        </Box>
        <Box display='flex'>
          {affordabilityIcons.map((icon, index) => (
            <React.Fragment key={index}>{icon}</React.Fragment>
          ))}
          <Box marginLeft={3}>
            <StyledUl>
              {tags.map((tag: string, index: number) => (
                <StyledLi key={index}>{tag}</StyledLi>
              ))}
            </StyledUl>
          </Box>
        </Box>
        <Box>
          <StyledTypography variant='body2'>Westmall</StyledTypography>
        </Box>
        <Box display='flex'>
          <StyledDistance variant='body2' marginRight={1}>
            900 m
          </StyledDistance>
          <StyledTypography variant='body2'>away</StyledTypography>
        </Box>
      </StyledInfoBox>
    </Box>
  );
};
