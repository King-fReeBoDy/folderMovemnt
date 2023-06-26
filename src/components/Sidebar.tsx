import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiHome5Line, RiLogoutBoxRLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { clearLocalStorage } from "../utils/localStorage";
import ReactSwitch from "react-switch";

interface IFunctions {
  handleSidebarToggle: () => void;
  toggleSidebar: boolean;
}

const Sidebar = ({ handleSidebarToggle, toggleSidebar }: IFunctions) => {
  const handleLogout = () => {
    clearLocalStorage();
    window.location.reload();
  };
  const [toggleTheme, setToggleTheme] = useState(false);
  return (
    <div className="bg-neutral-100 flex flex-col justify-between p-5 h-screen">
      <div className="">
        <button
          className="ml-1 py-2 flex items-center"
          onClick={handleSidebarToggle}
        >
          <div className="bg-blue-600 rounded-full p-2">
            <RxHamburgerMenu className="text-2xl text-white" />
          </div>
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Menu</p>
        </button>
        <Link to="/">
          <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 ">
            <RiHome5Line className="text-2xl" />
            <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Home</p>
          </button>
        </Link>
        <Link to="/search">
          <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3">
            <BiSearch className="text-2xl" />
            <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
              Search
            </p>
          </button>
        </Link>
      </div>
      <div>
        <div className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3">
          <button
            className={`h-5 w-10 bg-neutral-400 rounded-full flex items-center px-1  ${
              toggleTheme ? "justify-end" : "justify-start"
            }`}
            onClick={() => setToggleTheme(!toggleTheme)}
          >
            <motion.p
              layout
              className="rounded-full h-3 w-3 bg-neutral-600 p-2"
            ></motion.p>
          </button>

          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
            {toggleTheme ? "Dark Mode" : "Light Mode"}
          </p>
        </div>
        <Link to="/adduser">
          <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3">
            <AiOutlineUserAdd className="text-2xl" />
            <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
              Add User
            </p>
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3"
        >
          <RiLogoutBoxRLine className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
