import { useState, useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiHome5Line, RiLogoutBoxRLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { clearSessionStorage } from "../utils/localStorage";
import ReactSwitch from "react-switch";
import { AuthContext } from "../context/AuthContext";

interface IFunctions {
  handleSidebarToggle: () => void;
  toggleSidebar: boolean;
  theme: string;
  setTheme: (theme: string) => void;
}

const Sidebar = ({
  handleSidebarToggle,
  toggleSidebar,
  theme,
  setTheme,
}: IFunctions) => {
  const { loggedInUser } = useContext(AuthContext);
  const [toggleTheme, setToggleTheme] = useState(false);
  const handleLogout = () => {
    clearSessionStorage();
    window.location.reload();
  };

  const handleThemeToggle = () => {
    setToggleTheme(!toggleTheme);
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="bg-neutral-100 flex flex-col justify-between p-5 h-screen dark:bg-gray-800">
      <div className="">
        <button
          className="ml-1 py-2 flex items-center "
          onClick={handleSidebarToggle}
        >
          <div className="bg-blue-600 rounded-full p-2 dark:bg-blue-900 shadow-lg">
            <RxHamburgerMenu className="text-2xl text-white dark:text-gray-400" />
          </div>
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Menu</p>
        </button>
        <Link to="/">
          <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 dark:hover:bg-gray-700">
            <RiHome5Line className="text-2xl" />
            <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Home</p>
          </button>
        </Link>
        <Link to="/search">
          <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 dark:hover:bg-gray-700">
            <BiSearch className="text-2xl" />
            <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
              Search
            </p>
          </button>
        </Link>
      </div>
      <div>
        <div className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 dark:hover:bg-gray-700">
          <button
            className={`h-5 w-10 bg-gray-400 rounded-full flex items-center px-1 dark:bg-gray-700 ${
              toggleTheme ? "justify-end" : "justify-start"
            }`}
            onClick={handleThemeToggle}
          >
            <motion.p
              layout
              className="rounded-full h-3 w-3 bg-neutral-600 p-2 dark:bg-neutral-500"
            ></motion.p>
          </button>

          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
            {toggleTheme ? "Dark Mode" : "Light Mode"}
          </p>
        </div>
        {loggedInUser?.role === "ADMIN" && (
          <Link to="/adduser">
            <button className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 dark:hover:bg-gray-700">
              <AiOutlineUserAdd className="text-2xl" />
              <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
                Add User
              </p>
            </button>
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center my-2 hover:bg-neutral-300 rounded-full p-3 dark:hover:bg-gray-700 "
        >
          <RiLogoutBoxRLine className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
