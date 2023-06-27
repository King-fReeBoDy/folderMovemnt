import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddUser from "./pages/AddUser";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const createTables = async () => {
      try {
        await invoke("create_tables_command");
        const user = JSON.stringify({
          username: "ADMIN",
          password: "1234",
          role: "ADMIN",
        });
        await invoke("create_users_command", { user });
      } catch (error) {
        console.log(error);
      }
    };
    createTables();
  }, []);

  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  //     setTheme("light");
  //   } else {
  //     setTheme("dark");
  //   }
  // }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          element={<SharedLayout theme={theme} setTheme={setTheme} />}
        >
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/adduser" element={<AddUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
