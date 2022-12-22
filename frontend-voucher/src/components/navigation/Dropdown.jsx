import { Link } from "react-router-dom";
import { menuItems } from "./MenuItems";

{
  /* Edit Link 'to' attribute in MenuItems.jsx */
}

function Dropdown({ open }) {
  const liElements = menuItems.map((item) => {
    return (
      <li key={item.id} className="li-dropdown">
        {item.id === 2 ? (
          <Link
            key={item.id}
            className="grid gap-x-1 grid-cols-3 items-center"
            to={item.url}
          >
            <p className="col-span-2">Become a pandapro</p>
            <span className="col-span-1">{item.element}</span>
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
      className={`absolute z-10 py-2 shadow-md text-black text-start bg-white border-[0.02em] border-gray-200 top-[65px] w-[273px] transition duration-300 ${
        open
          ? "ease-out opacity-100 translate-x-0 pointer-events-auto"
          : "ease-in opacity-0 -translate-x-28 pointer-events-none"
      }`}
    >
      {liElements}
    </ul>
  );
}

export default Dropdown;
