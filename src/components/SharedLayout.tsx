import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoginPage from "../pages/LoginPage";
import { AuthContext } from "../context/AuthContext";

const SharedLayout = () => {
  // const [loginUser, setLoginUser] = useState<undefined | {}>();
  const { loggedInUser } = useContext(AuthContext);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      {loggedInUser ? (
        <div className="grid grid-cols-12 text-gray-600 w-full text-sm font-light ">
          <div className={`${toggleSidebar ? "col-span-2" : "col-span-1"} `}>
            <Sidebar
              handleSidebarToggle={handleSidebarToggle}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div
            className={`${
              toggleSidebar ? "col-span-10" : "col-span-11"
            } relative overflow-auto h-screen`}
          >
            <Header />

            <Outlet />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default SharedLayout;
