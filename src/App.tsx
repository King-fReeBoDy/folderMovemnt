import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddUser from "./pages/AddUser";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const createTables = async () => {
      try {
        await invoke("create_tables_command");
      } catch (error) {
        console.log(error);
      }
    };
    createTables();
  }, []);

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
        <Route path="/" element={<SharedLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/adduser" element={<AddUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
