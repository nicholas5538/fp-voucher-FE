import { Link } from 'react-router-dom';
import { menuItems } from './MenuItems';

type dropdownProps = {
  open: boolean;
};

function Dropdown({ open }: dropdownProps) {
  const liElements = menuItems.map((item) => {
    return (
      <li key={item.id} className='li-dropdown'>
        {item.id === 2 ? (
          <Link
            key={item.id}
            className='link grid h-full w-full grid-cols-3 items-center gap-x-1'
            to={item.url}
          >
            <p className='col-span-2'>Become a pandapro</p>
            <span className='col-span-1 mt-2'>{item.element}</span>
          </Link>
        ) : (
          <Link
            key={item.id}
            to={item.url}
            className='link grid h-full w-full grid-cols-1 items-center justify-start'
          >
            {item.element}
          </Link>
        )}
      </li>
    );
  });

  return (
    <ul
      className={`ul-dropdown ${
        open
          ? 'pointer-events-auto translate-x-0 opacity-100 ease-out lg:translate-y-0'
          : 'pointer-events-none -translate-x-28 opacity-0 ease-in lg:translate-x-0 lg:-translate-y-28'
      }`}
    >
      {liElements}
    </ul>
  );
}

export default Dropdown;
