import { invoke } from "@tauri-apps/api";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataContext";

interface IAddRecord {
  handleAddPatientModal: () => void;
}

const AddRecord = ({ handleAddPatientModal }: IAddRecord) => {
  const { loggedInUser } = useContext(AuthContext);
  const { getAllRecords } = useContext(DataContext);
  const [addNewRecord, setAddNewRecord] = useState({
    OPDNumber: "",
    NameOfPatient: "",
    SourceOfRequest: "",
    RequestingOfficer: "",
    Purpose: "",
    FolderTakenBy: "",
    FolderIssuedBy: loggedInUser?.username.toUpperCase(),
    DateOfIssue: "",
    FolderReceivedBy: "",
    DateOfReceiving: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setAddNewRecord((prev) => {
      return {
        ...prev,
        [name]: value.toUpperCase(),
      };
    });
  };

  const handleAddNewRecord = async (event: FormEvent) => {
    event.preventDefault();

    if (
      !addNewRecord.OPDNumber ||
      !addNewRecord.NameOfPatient ||
      !addNewRecord.SourceOfRequest ||
      !addNewRecord.RequestingOfficer ||
      !addNewRecord.Purpose ||
      !addNewRecord.FolderTakenBy ||
      !addNewRecord.FolderIssuedBy ||
      !addNewRecord.DateOfIssue ||
      !addNewRecord.FolderReceivedBy
    ) {
      toast.error("Input all fields");
      return;
    }
    if (!addNewRecord.DateOfReceiving) {
      console.log("here");
    } else if (addNewRecord.DateOfIssue > addNewRecord.DateOfReceiving) {
      toast.error("Date of issue is grater than date of receiving");
      return;
    }

    setAddNewRecord({
      OPDNumber: "",
      NameOfPatient: "",
      SourceOfRequest: "",
      RequestingOfficer: "",
      Purpose: "",
      FolderTakenBy: "",
      FolderIssuedBy: loggedInUser?.username.toUpperCase(),
      DateOfIssue: "",
      FolderReceivedBy: "",
      DateOfReceiving: "",
    });

    try {
      const newrecord = JSON.stringify(addNewRecord);
      await invoke("create_records_command", { newrecord });
      toast.success("New record added");
      getAllRecords();
      console.log(addNewRecord);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"
        onClick={handleAddPatientModal}
      ></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg dark:bg-gray-900">
        <form onSubmit={handleAddNewRecord}>
          <h2 className="text-2xl text-black font-bold text-center mb-5 dark:text-gray-300">
            Add Record
          </h2>
          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Issue <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="date"
                name="DateOfIssue"
                value={addNewRecord.DateOfIssue}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg w-full dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                OPD Number <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="OPDNumber"
                value={addNewRecord.OPDNumber}
                maxLength={10}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Name Of Patient{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="NameOfPatient"
                value={addNewRecord.NameOfPatient}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              />
            </div>

            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Requesting Officer{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="RequestingOfficer"
                value={addNewRecord.RequestingOfficer}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-5">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Source Of Request{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="SourceOfRequest"
                value={addNewRecord.SourceOfRequest}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              >
                <option value=""> --Choose Sourse of request--</option>
                <option value="WARD">Ward</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ER">ER</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Purpose <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="Purpose"
                value={addNewRecord.Purpose}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              >
                <option value=""> -- Choose Purpose --</option>
                <option value="ADMISSION">Admission</option>
                <option value="REVIEW">Review</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <section className="grid grid-cols-2 w-full">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Taken By{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="FolderTakenBy"
                value={addNewRecord.FolderTakenBy}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg w-full uppercase dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Folder Issue By
              </label>
              <input
                type="text"
                name="FolderIssuedBy"
                value={addNewRecord.FolderIssuedBy}
                disabled
                className="p-2 border-2 rounded-lg uppercase w-full dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Received By{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="FolderReceivedBy"
                value={addNewRecord.FolderReceivedBy}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg uppercase dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Receiving
              </label>
              <input
                type="date"
                name="DateOfReceiving"
                value={addNewRecord.DateOfReceiving}
                onChange={handleChange}
                className="p-2 border-2 rounded-lg dark:bg-gray-700 dark:border-gray-700"
              />
            </div>
          </section>

          <div className="flex items-center my-5">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg dark:bg-blue-700 dark:border-blue-700">
              <p className="">Add New Record</p>
            </button>
            <button
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-700"
              onClick={handleAddPatientModal}
            >
              <p className="">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddRecord;
