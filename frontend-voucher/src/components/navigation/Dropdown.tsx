import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from './MenuItems';

type dropdownProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Dropdown = ({ open, setOpen }: dropdownProps) => {
  const liElements = menuItems.map(({ Icon, id, url, text }) => {
    return (
      <li key={id} className='li-dropdown'>
        <Link
          key={id}
          to={url}
          onClick={() => setOpen((prevState) => !prevState)}
          className='link grid h-full w-full grid-cols-1 items-center justify-start font-mont text-sm'
        >
          <div className='flex flex-row items-center space-x-2 px-4 lg:px-6'>
            <Icon className='fill-pink-500' />
            <p>{text}</p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <ul
      className={clsx(
        'ul-dropdown pointer-events-none w-[190px] -translate-x-28 opacity-0 ease-in lg:w-[200px] lg:translate-x-0 lg:-translate-y-28',
        {
          'pointer-events-auto translate-x-0 opacity-100 ease-out lg:translate-y-0':
            open,
        },
      )}
    >
      {liElements}
    </ul>
  );
};

export default Dropdown;
