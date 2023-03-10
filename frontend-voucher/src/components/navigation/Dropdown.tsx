import { Link } from 'react-router-dom';
import { menuItems } from './MenuItems';
import clsx from 'clsx';

type dropdownProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ open, setOpen }: dropdownProps) => {
  const liElements = menuItems.map((item) => {
    return (
      <li key={item.id} className='li-dropdown'>
        <Link
          key={item.id}
          to={item.url}
          onClick={() => setOpen((prevState) => !prevState)}
          className={clsx(
            'link grid h-full w-full grid-cols-1 items-center font-mont text-sm',
            {
              'grid-cols-2 gap-x-1': item.id === 2,
              'justify-start': item.id !== 2,
            }
          )}
        >
          {item.id === 2 ? (
            <>
              <p className='col-span-1'>Pandapro</p>
              <span className='col-span-1 mt-2'>{item.element}</span>
            </>
          ) : (
            item.element
          )}
        </Link>
      </li>
    );
  });

  return (
    <ul
      className={clsx(
        'ul-dropdown pointer-events-none -translate-x-28 opacity-0 ease-in lg:translate-x-0 lg:-translate-y-28',
        {
          'pointer-events-auto translate-x-0 opacity-100 ease-out lg:translate-y-0':
            open,
        }
      )}
    >
      {liElements}
    </ul>
  );
};

export default Dropdown;
