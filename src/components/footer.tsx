/// <reference types="vite-plugin-svgr/client" />

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg?react';
import Brand from '../assets/brand.svg?react';
import { useUserContext } from '../hooks/useUserContext';

const Footer = () => {
  const { cookies } = useUserContext();
  const sitemap = [
    {
      url: '/vouchers',
      label: 'View vouchers',
    },
    {
      url: '/vouchers/create',
      label: 'Create voucher',
    },
    {
      url: '/vouchers',
      label: 'Update voucher',
    },
    {
      url: '/vouchers',
      label: 'Delete voucher',
    },
    {
      url: '/carts',
      label: 'Cart',
    },
  ];

  const siteMapLinks = sitemap.map(({ url, label }, index) => {
    return (
      <Link
        key={index.toString()}
        to={url}
        className={clsx('px-4 pb-4 no-underline md:pb-0', {
          'm-0 border-0 border-b border-solid border-black md:border-b-0 md:border-r':
            index !== sitemap.length - 1,
          'md:pl-0': index === 0,
        })}
      >
        <p className='text-sm font-medium text-black'>{label}</p>
      </Link>
    );
  });

  return (
    <footer className='border-0 border-t-2 border-solid border-pink-500 py-8 px-6'>
      <div className='mx-auto flex max-w-7xl flex-col md:items-start xl:px-6'>
        {cookies.jwt ? (
          <>
            <h3 className='mb-4 text-center text-lg'>Overview</h3>
            <div className='mb-4 flex flex-col items-center justify-center space-y-4 px-4 md:flex-row md:space-y-0 md:px-0'>
              {siteMapLinks}
            </div>
          </>
        ) : null}
        <div className='flex flex-col items-center md:items-start'>
          <Link to='/' className='mb-4 md:flex md:space-x-2'>
            <Logo className='hidden md:block' />
            <Brand />
          </Link>
          <p className='text-sm'>&copy; 2023 foodpanda. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
