import React from "react";

interface IDeleteRecord {
  handleDeletePatientModal: () => void;
}

const DeleteRecord = ({ handleDeletePatientModal }: IDeleteRecord) => {
  return (
    <section className="relative">
      <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg">
        <div>
          <h2 className="text-2xl text-black font-bold text-center mb-5">
            Delete Record
          </h2>
          <p className="text-center">
            Are you sure you want to delete this record, <br />
            with the OPD Number :{" "}
            <span className="text-blue-600 font-bold">G005982/22</span>
          </p>
          <div className="flex justify-between items-center my-5">
            <button className=" bg-red-600 px-5 py-2 text-white border-2 border-red-600 rounded-lg shadow-lg">
              <p className="ml-2">Delete Patient Record</p>
            </button>
            <button
              onClick={handleDeletePatientModal}
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
            >
              <p className="ml-2">Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteRecord;
