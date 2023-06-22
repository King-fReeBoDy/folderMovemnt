import { useState } from "react";
import Body from "../components/Body";
import AddRecord from "../components/AddRecord";
import EditRecord from "../components/EditRecord";
import DeleteRecord from "../components/DeleteRecord";

const Home = () => {
  const [addPatientModal, setAddPatientModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [deleteRecordModal, setDeleteRecordModal] = useState(false);

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
      <div>
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
};

export default Home;
