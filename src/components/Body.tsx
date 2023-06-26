import { useEffect, useState, useContext } from "react";
import { AiOutlineTable, AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CiTrash, CiEdit } from "react-icons/ci";
import data from "../data";
import { Link } from "react-router-dom";
import { invoke } from "@tauri-apps/api";
import { DataContext } from "../context/DataContext";

interface IBody {
  handleAddPatientModal: () => void;
  handleEditPatientModal: () => void;
  handleDeletePatientModal: () => void;
}

const Body = ({
  handleAddPatientModal,
  handleEditPatientModal,
  handleDeletePatientModal,
}: IBody) => {
  const { records, getAllRecords, setEditId, setDeleteId } =
    useContext(DataContext);
  useEffect(() => {
    getAllRecords();
  }, []);
  const [border, setBorder] = useState<number>();

  const handleId = (id: number) => {
    setBorder(id);
    setEditId(id);
    setDeleteId(id);
  };
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-4xl font-bold my-5 text-black">📁 All Records</h1>
        <button
          className="flex items-center bg-blue-600 text-white px-3 py-2 shadow-md rounded-lg"
          onClick={handleAddPatientModal}
        >
          <AiOutlinePlus />
          <p className="ml-2">Add Record</p>
        </button>
      </div>
      <div className="flex justify-between items-center text-sm border-b-2 px-5">
        <button className="flex items-center  px-4 py-2 focus:text-black focus:font-bold">
          <AiOutlineTable />
          <p className="ml-2">All Records</p>
        </button>
        <div className="flex items-center">
          <button className="px-4 py-2 focus:text-black focus:font-bold">
            Export
          </button>
          <button className="px-4 py-2 focus:text-black focus:font-bold">
            Sort
          </button>
          <Link to="/search">
            <button className="px-4 py-2 focus:text-black focus:font-bold">
              <BiSearch className="text-base" />
            </button>
          </Link>
        </div>
      </div>

      <main className="overflow-y-auto h-[400px] px-5">
        <table className="text-xs w-full">
          <thead className="sticky top-0  backdrop-blur-lg inset-x-0">
            <tr className="">
              <th className="border-r-2  px-5 py-3 whitespace-nowrap">
                Date Of Issue
              </th>
              <th className="border-r-2  px-5 py-3 whitespace-nowrap">
                OPD Number
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Name Of Patient
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Source Of Request
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Prescriber Name
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Purpose
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Folder Taken By
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Folder Issued By
              </th>

              <th className="border-r-2 px-5 py-3 whitespace-nowrap">
                Folder Received By
              </th>
              <th className="px-5 py-3 whitespace-nowrap">Date of Receiving</th>
            </tr>
          </thead>

          <tbody className="">
            {records.length !== 0 &&
              records.map((record, idx) => {
                return (
                  <tr
                    key={record.id}
                    className={`${
                      border === record.id
                        ? "border-4 border-blue-200 rounded-full"
                        : ""
                    } hover:bg-gray-100  `}
                    onClick={() => handleId(record.id)}
                  >
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap ">
                      {record.dateofissue}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.opdnumber}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.nameofpatient}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.sourceofrequest}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.requestingofficer}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap ">
                      {record.purpose}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.foldertakenby}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.folderissuedby}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                      {record.folderreceivedby}
                    </td>
                    <td className="text-center border-b-2 whitespace-nowrap py-3">
                      {record.dateofreceiving}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {records.length === 0 && (
          <div className="flex justify-center text-4xl font-bold w-full p-5">
            <p className="text-center">No Results</p>
          </div>
        )}
      </main>
      {border !== undefined && border >= 0 && (
        <div className="flex items-center my-5 px-5">
          <button
            onClick={handleEditPatientModal}
            className="flex items-center bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg"
          >
            <CiEdit />
            <p className="ml-2">Edit</p>
          </button>
          <button
            onClick={handleDeletePatientModal}
            className="flex items-center ml-4 border-2 border-red-500 text-red-500 px-5 py-2 rounded-lg shadow-lg"
          >
            <CiTrash />
            <p className="ml-2">Delete</p>
          </button>
        </div>
      )}
    </section>
  );
};

export default Body;
