import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { menuItems } from './MenuItems';
import Button from '@mui/material/Button';
import ModalComponent from '../modal';
import { useState } from 'react';

type dropdownProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Dropdown = ({ open, setOpen }: dropdownProps) => {
  const { logout } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const liElements = menuItems.map(({ Icon, id, url, text }) => {
    const clickHandler = () => {
      {
        id === 3 && logout();
      }
      setOpen((prevState) => !prevState);
    };

    return (
      <li key={id.toString()} className='li-dropdown'>
        {id === 3 ? (
          <>
            <Button
              className='flex h-full w-full flex-row items-center justify-start space-x-2 pl-4 capitalize hover:bg-gray-100 lg:pl-6'
              variant='text'
              onClick={() => setOpenModal((prevState) => !prevState)}
            >
              <Icon className='fill-pink-500' />
              <p>{text}</p>
            </Button>
            <ModalComponent
              modalTitle='Are you sure you want to logout?'
              modalDesc='Warning, you will lose all unsaved changes.'
              // Note to myself: Need to change the line below to handle DELETE API
              clickHandler={clickHandler}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </>
        ) : (
          <Link
            to={url}
            onClick={clickHandler}
            className='link grid h-full w-full grid-cols-1 items-center justify-start font-mont text-sm'
          >
            <div className='flex flex-row items-center space-x-2 px-4 lg:px-6'>
              <Icon className='fill-pink-500' />
              <p>{text}</p>
            </div>
          </Link>
        )}
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
