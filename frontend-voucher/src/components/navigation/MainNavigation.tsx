import { useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Brand } from '../../assets/brand.svg';
import { ReactComponent as Cart } from '../../assets/cart.svg';
import { ReactComponent as Favourite } from '../../assets/favourite.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Profile } from '../../assets/profile.svg';
import Dropdown from './Dropdown';
import useOutsideAlerter from './useOutSideAlerter';

const MainNavigation = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(dropdownRef, setOpen);

  return (
    <nav className='sticky top-0 z-50 w-full bg-white shadow-lg	'>
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between border-none'>
        <div
          className='relative lg:order-2 lg:border-x lg:border-y-0 lg:border-solid lg:border-gray-300'
          ref={dropdownRef}
        >
          <button
            className='flex h-16 cursor-pointer items-center space-x-2 border-0 bg-transparent px-4'
            onClick={() => setOpen((prevState) => !prevState)}
          >
            <Profile />
            {/* Replace hardcoded name with Authentication */}
            <span className='hidden text-ellipsis text-center font-sans text-xs font-bold text-black lg:block'>
              NICK
            </span>
            <IconContext.Provider
              value={{
                color: 'rgb(226, 27, 112)',
                className: `hidden lg:block lg:transition-rotate duration-300 ${
                  open ? 'lg:rotate-180' : 'rotate-0'
                }`,
              }}
            >
              <FaAngleDown />
            </IconContext.Provider>
          </button>
          <Dropdown open={open} />
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
        <div className='navbar-icon-centered lg:order-3'>
          <NavLink to='/favourites' end>
            <Favourite className='hover:fill-pink-800' />
          </NavLink>
        </div>
        <div className='navbar-icon-centered lg:order-last'>
          <NavLink to='/cart' end>
            <Cart className='hover:fill-pink-800' />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
