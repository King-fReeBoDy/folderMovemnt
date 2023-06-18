import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiHome5Line, RiLogoutBoxRLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";

interface IFunctions {
  handleSidebarToggle: () => void;
  toggleSidebar: boolean;
}

const Sidebar = ({ handleSidebarToggle, toggleSidebar }: IFunctions) => {
  return (
    <div
      className={`bg-neutral-100 flex flex-col justify-between p-7 h-screen`}
    >
      <div className="">
        <button
          className="-ml-2 py-2 flex items-center"
          onClick={handleSidebarToggle}
        >
          <div className="bg-blue-600 rounded-full p-2">
            <RxHamburgerMenu className="text-2xl text-white" />
          </div>
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Menu</p>
        </button>
        <button className="flex items-center py-2 ">
          <RiHome5Line className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Home</p>
        </button>
        <button className="flex items-center py-2">
          <BiSearch className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Search</p>
        </button>
      </div>
      <div>
        <button className="flex items-center py-2 ">
          <AiOutlineUserAdd className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>
            Add User
          </p>
        </button>
        <button className="flex items-center py-2 ">
          <RiLogoutBoxRLine className="text-2xl" />
          <p className={`ml-2 ${toggleSidebar ? "block" : "hidden"}`}>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
