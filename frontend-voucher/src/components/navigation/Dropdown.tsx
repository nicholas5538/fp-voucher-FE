import { Link } from 'react-router-dom';
import { menuItems } from './MenuItems';

{
  /* Edit Link 'to' attribute in MenuItems.jsx */
}

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
            className='grid gap-x-1 grid-cols-3 items-center'
            to={item.url}
          >
            <p className='col-span-2'>Become a pandapro</p>
            <span className='col-span-1'>{item.element}</span>
          </Link>
        ) : (
          <Link key={item.id} to={item.url}>
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
          ? 'ease-out opacity-100 translate-x-0 pointer-events-auto lg:translate-y-0'
          : 'ease-in opacity-0 -translate-x-28 pointer-events-none lg:translate-x-0 lg:-translate-y-28'
      }`}
    >
      {liElements}
    </ul>
  );
}

export default Dropdown;
