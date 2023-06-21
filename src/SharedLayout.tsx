import Body from "./Body";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddRecord from "./AddRecord";
import EditRecord from "./EditRecord";
import DeleteRecord from "./DeleteRecord";

const SharedLayout = () => {
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
      {/* {addPatientModal && (
        <AddRecord handleAddPatientModal={handleAddPatientModal} />
      )}
      {editRecordModal && (
        <EditRecord handleEditPatientModal={handleEditPatientModal} />
      )}
      {deleteRecordModal && (
        <DeleteRecord handleDeletePatientModal={handleDeletePatientModal} />
      )} */}
    </div>
  );
};

export default SharedLayout;
