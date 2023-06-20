import { useState } from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddRecord from "./AddRecord";
import EditRecord from "./EditRecord";
import DeleteRecord from "./DeleteRecord";

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
    <div className="grid grid-cols-12 text-gray-600 w-full text-sm font-light">
      <div className={`${toggleSidebar ? "col-span-2" : "col-span-1"} `}>
        <Sidebar
          handleSidebarToggle={handleSidebarToggle}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className={`${toggleSidebar ? "col-span-10" : "col-span-11"}`}>
        <Body
          handleAddPatientModal={handleAddPatientModal}
          handleEditPatientModal={handleEditPatientModal}
          handleDeletePatientModal={handleDeletePatientModal}
        />
      </div>
      {addPatientModal && (
        <AddRecord handleAddPatientModal={handleAddPatientModal} />
      )}
      {editRecordModal && (
        <EditRecord handleEditPatientModal={handleEditPatientModal} />
      )}
      {deleteRecordModal && (
        <DeleteRecord handleDeletePatientModal={handleDeletePatientModal} />
      )}
    </div>
  );
}

export default App;
