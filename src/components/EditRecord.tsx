import { invoke } from "@tauri-apps/api";
import { useEffect, useContext, useState, ChangeEvent, FormEvent } from "react";
import { DataContext } from "../context/DataContext";
import { Newrecord } from "../context/DataContext";
import { toast } from "react-toastify";

export interface IEditModal {
  handleEditPatientModal: () => void;
}

const EditRecord = ({ handleEditPatientModal }: IEditModal) => {
  const { editId, getAllRecords } = useContext(DataContext);
  const [editRecord, setEditRecord] = useState<Newrecord | null>(null);

  useEffect(() => {
    const getRecordById = async () => {
      try {
        const id = JSON.stringify(editId);
        const results: Newrecord = JSON.parse(
          await invoke("get_record_by_id_command", { id })
        );
        console.log(results);
        setEditRecord(results);
      } catch (error) {
        console.log(error);
      }
    };
    getRecordById();
  }, []);

  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setEditRecord((prev) => {
      if (prev === null) {
        return null;
      }

      return {
        ...prev,
        [name]: value.toUpperCase(),
      };
    });
  };

  const handleEditSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const record = JSON.stringify(editRecord);
      await invoke("update_record_by_id_command", { record });
      setEditRecord(null);
      handleEditPatientModal();
      getAllRecords();
      toast.success("Record edited successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <section className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"
        onClick={handleEditPatientModal}
      ></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg">
        <form onSubmit={handleEditSubmit}>
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
                name="dateofissue"
                value={editRecord?.dateofissue}
                onChange={handleEditChange}
                className="p-2 border-2 rounded-lg w-full"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                OPD Number
              </label>
              <input
                type="text"
                name="opdnumber"
                value={editRecord?.opdnumber}
                maxLength={10}
                onChange={handleEditChange}
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
                name="nameofpatient"
                value={editRecord?.nameofpatient}
                onChange={handleEditChange}
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>

            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Requesting Officer
              </label>
              <input
                type="text"
                name="requestingofficer"
                value={editRecord?.requestingofficer}
                onChange={handleEditChange}
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
                name="sourceofrequest"
                value={editRecord?.sourceofrequest}
                onChange={handleEditChange}
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
                name="purpose"
                value={editRecord?.purpose}
                onChange={handleEditChange}
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
                name="foldertakenby"
                value={editRecord?.foldertakenby}
                onChange={handleEditChange}
                className="p-2 border-2 rounded-lg w-full uppercase"
              />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Folder Issue By
              </label>
              <input
                type="text"
                name="folderissuedby"
                value={editRecord?.folderissuedby}
                onChange={handleEditChange}
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
                name="folderreceivedby"
                value={editRecord?.folderreceivedby}
                onChange={handleEditChange}
                className="p-2 border-2 rounded-lg uppercase"
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Receiving
              </label>
              <input
                type="date"
                name="dateofreceiving"
                value={editRecord?.dateofreceiving}
                onChange={handleEditChange}
                className="p-2 border-2 rounded-lg"
              />
            </div>
          </section>

          <div className="flex items-center my-5">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
              <p className="">Save Record</p>
            </button>
            <button
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
              onClick={handleEditPatientModal}
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
