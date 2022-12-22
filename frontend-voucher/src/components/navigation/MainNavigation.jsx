import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Brand } from "../../assets/brand.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { ReactComponent as Favourite } from "../../assets/favourite.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { FaAngleDown } from "react-icons/fa";
import Dropdown from "./Dropdown";
import useOutsideAlerter from "./useOutSideAlerter";

function MainNavigation() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  useOutsideAlerter(dropdownRef, setOpen)

  return (
    <nav className="z-0 flex place-content-between items-center shadow-lg h-16">
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 px-4 h-16"
          onClick={() => setOpen(prevState => !prevState)}
        >
          <Profile />
          {/* Replace hardcoded name with Authentication */}
          <span className="hidden text-black text-xs text-ellipsis text-center font-bold font-sans">
            ANDY
          </span>
          <IconContext.Provider
            value={{ color: "rgb(226, 27, 112)", className: "hidden" }}
          >
            <FaAngleDown />
          </IconContext.Provider>
        </button>
        <Dropdown open={open} />
      </div>
      <div className="px-6 w-3/4 h-16">
        <div className="mx-auto my-4 w-1/3 h-1/2">
          <NavLink to="/" className="flex place-content-center" end>
            <Logo className="hidden" />
            <Brand />
          </NavLink>
        </div>
      </div>
      <div className="px-2">
        <NavLink to="/favourites" end>
          <Favourite />
        </NavLink>
      </div>
      <div className="px-4">
        <NavLink to="/cart" end>
          <Cart />
        </NavLink>
      </div>
    </nav>
  );
}

export default MainNavigation;
