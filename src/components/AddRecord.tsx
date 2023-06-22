import { event } from "@tauri-apps/api";
import { FormEvent, useState } from "react";

interface IAddRecord {
  handleAddPatientModal: () => void;
}

const AddRecord = ({ handleAddPatientModal }: IAddRecord) => {
  const [recordOPD, setRecord] = useState("G");
  const [recordDateOfIssue, setRecordDateOfIssue] = useState("");
  const [recordPatientName, setRecordPatientName] = useState("");
  const [recordPrescriberName, setPrescriberName] = useState("");
  const [recordSourceOfRequest, setSourceOfRequest] = useState("");

  const handleAddNewRecord = (event: FormEvent) => {
    event.preventDefault();
    const newRecord = {
      opdnumber: recordOPD,
      dateofissue: recordDateOfIssue,
      patientname: recordPatientName,
      prescribername: recordPrescriberName,
      sourceofrequest: recordSourceOfRequest,
    };
    console.log(newRecord);
  };
  return (
    <section className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"
        onClick={handleAddPatientModal}
      ></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg">
        <form onSubmit={handleAddNewRecord}>
          <h2 className="text-2xl text-black font-bold text-center mb-5">
            Add Record
          </h2>
          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Issue
              </label>
              <input
                type="date"
                className="p-2 border-2 rounded-lg w-full"
                onChange={(event) => setRecordDateOfIssue(event.target.value)}
              />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                OPD Number
              </label>
              <input
                type="text"
                value={recordOPD}
                maxLength={10}
                onChange={(e) => setRecord(e.target.value)}
                className="p-2 border-2 rounded-lg"
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
                className="p-2 border-2 rounded-lg"
                onChange={(event) => setRecordPatientName(event.target.value)}
              />
            </div>

            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Prescriber Name
              </label>
              <input
                type="text"
                className="p-2 border-2 rounded-lg"
                onChange={(event) => setPrescriberName(event.target.value)}
              />
            </div>
          </section>

          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Source Of Request
            </label>
            <select name="" id="" className="p-2 border-2 rounded-lg">
              <option value=""> -- Choose source of request --</option>
              <option>Ward / Admission</option>
              <option>Review</option>
              <option>Doctor</option>
            </select>
          </div>

          <section className="flex ">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Taken By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Folder Issue By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Received By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Receiving
              </label>
              <input type="date" className="p-2 border-2 rounded-lg" />
            </div>
          </section>

          <div className="flex items-center my-5">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
              <p className="ml-2">Add New Patient</p>
            </button>
            <button
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
              onClick={handleAddPatientModal}
            >
              <p className="ml-2">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddRecord;
