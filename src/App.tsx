import { useState } from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddRecord from "./AddRecord";
import EditRecord from "./EditRecord";
import DeleteRecord from "./DeleteRecord";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SharedLayout from "./SharedLayout";
import Home from "./Home";
import Search from "./Search";
import AddUser from "./AddUser";

function App() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [addPatientModal, setAddPatientModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [deleteRecordModal, setDeleteRecordModal] = useState(false);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleAddPatientModal = () => {
    setAddPatientModal(!addPatientModal);
  };

  const handleEditPatientModal = () => {
    setEditRecordModal(!editRecordModal);
  };
  const handleDeletePatientModal = () => {
    setDeleteRecordModal(!deleteRecordModal);
  };
  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/adduser" element={<AddUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
