import { useState } from "react";
import Body from "./Body";
import Header from "./Header";

const Home = () => {
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
    <div>
      <div className={`${toggleSidebar ? "col-span-10" : "col-span-11"}`}>
        <Body
          handleAddPatientModal={handleAddPatientModal}
          handleEditPatientModal={handleEditPatientModal}
          handleDeletePatientModal={handleDeletePatientModal}
        />
      </div>
    </div>
  );
};

export default Home;
