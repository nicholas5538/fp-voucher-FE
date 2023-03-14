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

const MainNavigation = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, givenName, login } = useUserContext();
  const navigate = useNavigate();
  useOutsideAlerter(dropdownRef, setOpen);

  const cartClick = user ? () => navigate('carts') : () => login();

  return (
    <nav className='sticky top-0 z-50 w-full bg-white shadow-lg	'>
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-around border-none'>
        <div
          className='relative lg:order-2 lg:border-x lg:border-y-0 lg:border-solid lg:border-gray-300'
          ref={dropdownRef}
        >
          <button
            className='flex h-16 cursor-pointer items-center space-x-2 border-0 bg-transparent px-4'
            onClick={
              user ? () => setOpen((prevState) => !prevState) : () => login()
            }
          >
            <Profile />
            <span className='hidden text-ellipsis text-center font-mont text-xs font-bold text-black lg:block'>
              {user ? `${givenName.toUpperCase()}` : 'SIGN IN'}
            </span>
            {user && (
              <ExpandMoreRoundedIcon
                className={clsx(
                  'hidden fill-pink-500 duration-300 ease-out lg:block lg:transition-transform',
                  { 'lg:rotate-180': open, 'rotate-0': !open },
                )}
              />
            )}
          </button>
          {user && <Dropdown open={open} setOpen={setOpen} />}
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
          <NavLink to='carts' end>
            <ShoppingBagOutlinedIcon
              className='fill-pink-500 hover:fill-pink-700'
              onClick={cartClick}
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
