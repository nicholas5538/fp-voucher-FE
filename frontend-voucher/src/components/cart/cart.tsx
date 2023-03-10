import React from 'react';
import { ReactComponent as GroupOrderIcon } from '../../assets/group-order-icon.svg';
import { ReactComponent as InfoIcon } from '../../assets/info-icon.svg';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #e21b70;
`;

const StyledIcon = styled(GroupOrderIcon)`
  fill: white;
  margin: auto;
`;
const Cart = () => {
  return (
    <main>
      <div>
        <img
          data-testid='hero-banner-image'
          className='vendor-responsive-banner__image'
          srcSet='https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=400&height=100&quality=45 400w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=600&height=150&quality=45 600w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=800&height=200&quality=45 800w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1000&height=250&quality=45 1000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1200&height=300&quality=45 1200w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=1600&height=400&quality=45 1600w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=2000&height=500&quality=45 2000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=2500&height=625&quality=45 2500w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=3000&height=750&quality=45 3000w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=3500&height=875&quality=45 3500w, https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg?width=4000&height=1000&quality=45 4000w,'
          src='https://images.deliveryhero.io/image/fd-sg/LH/v6om-hero.jpg'
          sizes='(min-width:960px) calc(100vw - 352px),100vw'
          alt='Pizza Hut (West Mall) hero banner'
        />
      </div>
      <div className='flex'>
        <h1>Pizza Hut (West Mall)</h1>
        <StyledButton className='w-8 h-8 '>
          <StyledIcon />
        </StyledButton>
        <button className='w-8 h-8 '>
          <InfoIcon />
        </button>
      </div>
    </main>
  );
};

export default Cart;
