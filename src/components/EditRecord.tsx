import { invoke } from "@tauri-apps/api";
import { useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

export interface IEditModal {
  handleEditPatientModal: () => void;
}

const EditRecord = ({ handleEditPatientModal }: IEditModal) => {
  const { editId } = useContext(DataContext);
  useEffect(() => {
    const getRecordById = async () => {
      try {
        const id = JSON.stringify(editId);
        const results = await invoke("get_record_by_id_command", { id });
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    };
    getRecordById();
  }, []);
  return (
    <section className="relative">
      <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg">
        <form>
          <h2 className="text-2xl text-black font-bold text-center mb-5">
            Edit Record
          </h2>
          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Issue
              </label>
              <input
                type="date"
                name="DateOfIssue"
                className="p-2 border-2 rounded-lg w-full"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                OPD Number
              </label>
              <input
                type="text"
                name="OPDNumber"
                maxLength={10}
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Name Of Patient
              </label>
              <input
                type="text"
                name="NameOfPatient"
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>

            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Requesting Officer
              </label>
              <input
                type="text"
                name="RequestingOfficer"
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-5">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Source Of Request
              </label>
              <select
                name="SourceOfRequest"
                className="p-2 border-2 rounded-lg uppercase"
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
                Purpose
              </label>
              <select
                name="Purpose"
                className="p-2 border-2 rounded-lg uppercase"
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
                Folder Taken By
              </label>
              <input
                type="text"
                name="FolderTakenBy"
                className="p-2 border-2 rounded-lg w-full uppercase"
              />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Folder Issue By
              </label>
              <input
                type="text"
                name="FolderReceivedBy"
                disabled
                className="p-2 border-2 rounded-lg uppercase w-full"
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Received By
              </label>
              <input
                type="text"
                name="FolderReceivedBy"
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Receiving
              </label>
              <input
                type="date"
                name="DateOfReceiving"
                className="p-2 border-2 rounded-lg"
              />
            </div>
          </section>

          <div className="flex items-center my-5">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
              <p className="">Save Record</p>
            </button>
            <button
              onClick={handleEditPatientModal}
              className="ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
            >
              <p className="">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditRecord;
