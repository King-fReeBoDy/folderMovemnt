import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoginPage from "../pages/LoginPage";
import { AuthContext } from "../context/AuthContext";

interface IShareLayout {
  theme: string;
  setTheme: (theme: string) => void;
}

const SharedLayout = ({ theme, setTheme }: IShareLayout) => {
  const { loggedInUser } = useContext(AuthContext);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      {loggedInUser ? (
        <div className="grid grid-cols-12 text-gray-600 w-full text-sm font-light dark:bg-gray-900 dark:text-gray-400">
          <div className={`${toggleSidebar ? "col-span-2" : "col-span-1"} `}>
            <Sidebar
              handleSidebarToggle={handleSidebarToggle}
              toggleSidebar={toggleSidebar}
              theme={theme}
              setTheme={setTheme}
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
