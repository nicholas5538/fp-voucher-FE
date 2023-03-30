import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Brand } from '../../assets/brand.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Profile } from '../../assets/profile.svg';
import useOutsideAlerter from '../../hooks/useOutsideAlert';
import { useUserContext } from '../../hooks/useUserContext';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const StyledCircleBadge = styled.div`
  position: absolute;
  top: 13px;
  right: -7px;
  width: 18px;
  height: 18px;
  background-color: #d70f64;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const StyledShoppingBagOutlinedIcon = styled(ShoppingBagOutlinedIcon)`
  fill: #d70f64;
`;
const StyledNavLink = styled(NavLink)`
  &:hover ${StyledShoppingBagOutlinedIcon} {
    fill: rgb(243, 168, 200);
    transform: scale(1.1);
    transition: transform 330ms ease-in-out;
  }
  &:hover ${StyledCircleBadge} {
    background-color: rgb(243, 168, 200);
    transform: scale(1.1);
    transition: transform 330ms ease-in-out;
  }
`;

const MainNavigation = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { token, givenName, login } = useUserContext();
  const navigate = useNavigate();
  useOutsideAlerter(dropdownRef, setOpen);

  const cartClick = token ? () => navigate('carts') : () => login();

  return (
    <nav className='sticky top-0 z-50 w-full bg-white shadow-lg	'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-around border-none'>
        <div
          className='relative lg:order-2 lg:border-x lg:border-y-0 lg:border-solid lg:border-gray-300'
          ref={dropdownRef}
        >
          <button
            className='flex h-16 cursor-pointer items-center space-x-2 border-0 bg-transparent px-4'
            onClick={
              token ? () => setOpen((prevState) => !prevState) : () => login()
            }
          >
            <Profile />
            <span className='hidden truncate text-center font-mont text-xs font-bold text-black lg:block'>
              {token ? `${givenName.toUpperCase()}` : 'SIGN IN'}
            </span>
            {token && (
              <ExpandMoreRoundedIcon
                className={clsx(
                  'hidden fill-pink-500 duration-300 ease-out lg:block lg:transition-transform',
                  { 'lg:rotate-180': open, 'rotate-0': !open },
                )}
              />
            )}
          </button>
          {token && <Dropdown open={open} setOpen={setOpen} />}
        </div>
        <div className='h-16 w-5/6 px-6 lg:order-1'>
          <div className='mx-auto my-5 min-w-[8.3125rem] lg:ml-0'>
            <NavLink
              to='/'
              className='flex place-content-center md:space-x-2 lg:place-content-start'
              end
            >
              <Logo className='hidden md:block' />
              <Brand />
            </NavLink>
          </div>
        </div>
        <div className='grid h-full items-center px-4 lg:order-last'>
          <div className='relative'>
            <StyledNavLink to='carts' end>
              <StyledShoppingBagOutlinedIcon onClick={cartClick} />
              {token && <StyledCircleBadge>3</StyledCircleBadge>}
            </StyledNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
