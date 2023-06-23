import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddUser from "./pages/AddUser";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api";

function App() {
  useEffect(() => {
    const data = {
      username: "free",
      password: "1234",
      role: "admin",
    };
    const user = JSON.stringify(data);
    const createTables = async () => {
      await invoke("create_tables_command");
      // await invoke("create_users_command", { user });
      // const view: any = await invoke("get_all_users_command");
      // console.log(JSON.parse(view));
    };
    createTables();
  }, []);

  return (
    <>
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
