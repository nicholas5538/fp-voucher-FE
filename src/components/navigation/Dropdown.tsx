import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import ModalComponent from '../modal';
import { menuItems } from './MenuItems';

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
      <li key={text} className='li-dropdown'>
        {id === 3 ? (
          <>
            <Button
              className='flex h-full w-full flex-row items-center justify-start space-x-2 px-4 capitalize hover:bg-gray-100'
              variant='text'
              onClick={() => setOpenModal((prevState) => !prevState)}
              type='button'
            >
              <Icon className='fill-pink-500' />
              <p>{text}</p>
            </Button>
            <ModalComponent
              modalTitle='Are you sure you want to logout?'
              modalDesc='Warning, you will lose all unsaved changes.'
              clickHandler={clickHandler}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </>
        ) : (
          <Link
            to={url}
            onClick={clickHandler}
            className='link grid h-full w-full grid-cols-1 items-center justify-start text-sm'
          >
            <div className='flex flex-row items-center space-x-2 px-4'>
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
        'ul-dropdown pointer-events-none -translate-x-28 opacity-0 ease-in lg:-translate-y-28 lg:translate-x-0',
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
