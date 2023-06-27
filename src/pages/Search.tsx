import { ChangeEvent, FormEvent, useContext, useState } from "react";
import data from "../data";
import { CiEdit, CiTrash } from "react-icons/ci";
import { DataContext } from "../context/DataContext";
import { Newrecord } from "../context/DataContext";

interface ISearch {
  searchBy: string;
  inputSearch: string;
}
const Search = () => {
  const { records, setEditId, setDeleteId } = useContext(DataContext);
  const [filteredRecords, setFilteredRecords] = useState<Newrecord[] | []>([]);
  const [border, setBorder] = useState<number>();
  const [searchData, setSearchData] = useState<ISearch>({
    searchBy: "OPD Number",
    inputSearch: "".toUpperCase(),
  });

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setSearchData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (searchData.searchBy === "OPD Number") {
      const search: Newrecord[] = records.filter(
        (record) => record.opdnumber === searchData.inputSearch.toUpperCase()
      );
      setFilteredRecords((prev) => (prev = search));
      setSearchData({
        searchBy: "OPD Number",
        inputSearch: "".toUpperCase(),
      });
    } else {
      const search: Newrecord[] = records.filter(
        (record) => record.dateofissue === searchData.inputSearch.toUpperCase()
      );
      setFilteredRecords((prev) => (prev = search));
      setSearchData({
        searchBy: "OPD Number",
        inputSearch: "".toUpperCase(),
      });
    }
  };
  const handleId = (id: number) => {
    setBorder(id);
    setEditId(id);
    setDeleteId(id);
  };
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-4xl font-bold my-5 text-black dark:text-gray-300">
          🔍 Search
        </h1>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex justify-between items-end text-sm border-b-2 pb-2 px-5 dark:border-gray-700"
      >
        <section className="flex items-end">
          <div className="grid">
            <label htmlFor="" className="text-xs">
              Search by
            </label>
            <select
              name="searchBy"
              value={searchData.searchBy}
              onChange={handleSearchChange}
              className="px-5 py-2 border-2 rounded-lg dark:bg-gray-700 dark:border-gray-700"
            >
              <option value="OPD Number">OPD Number</option>
              <option value="Date">Date of issue</option>
            </select>
          </div>

          <div>
            {searchData.searchBy !== "Date" ? (
              <input
                type="text"
                name="inputSearch"
                value={searchData.inputSearch}
                onChange={handleSearchChange}
                className="px-5 py-2 border-2 rounded-lg bg-gray-100 ml-3 dark:bg-gray-700 dark:border-gray-700 uppercase placeholder:normal-case"
                placeholder="Search..."
              />
            ) : (
              <input
                type="date"
                name="inputSearch"
                value={searchData.inputSearch}
                onChange={handleSearchChange}
                className="px-5 py-2 border-2 rounded-lg bg-gray-100 ml-3 dark:bg-gray-700 dark:border-gray-700"
              />
            )}
          </div>
          <button className="px-5 py-2 border-2 bg-blue-600 border-blue-600 text-white rounded-lg ml-3 dark:bg-blue-900 dark:border-blue-900">
            Submit
          </button>
        </section>
        <div className="flex items-center">
          <button className="px-4 focus:text-black focus:font-bold">
            Export
          </button>
          <button className="px-4 focus:text-black focus:font-bold">
            Sort
          </button>
        </div>
      </form>

      <main className="overflow-y-auto h-[400px] px-5">
        <table className="text-xs w-full">
          <thead className="sticky top-0   inset-x-0 border-b-2 dark:border-gray-700">
            <tr className="">
              <th className="border-r-2  px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Date Of Issue
              </th>
              <th className="border-r-2  px-5 py-3 whitespace-nowrap dark:border-gray-700">
                OPD Number
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Name Of Patient
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Source Of Request
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Prescriber Name
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Purpose
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Folder Taken By
              </th>
              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Folder Issued By
              </th>

              <th className="border-r-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Folder Received By
              </th>
              <th className="px-5 py-3 whitespace-nowrap">Date of Receiving</th>
            </tr>
          </thead>

          <tbody className="">
            {filteredRecords.length !== 0 &&
              filteredRecords.map((record, idx) => {
                return (
                  <tr
                    key={record.id}
                    className={`${
                      border === record.id
                        ? "border-4 border-blue-200 rounded-full"
                        : ""
                    } hover:bg-gray-100 dark:hover:bg-gray-800 `}
                    onClick={() => handleId(record.id)}
                  >
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700 ">
                      {record.dateofissue}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.opdnumber}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.nameofpatient}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.sourceofrequest}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.requestingofficer}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700 ">
                      {record.purpose}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.foldertakenby}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.folderissuedby}
                    </td>
                    <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700 dark:border-gray-700">
                      {record.folderreceivedby}
                    </td>
                    <td className="text-center border-b-2 whitespace-nowrap py-3 dark:border-gray-700 dark:border-gray-700">
                      {record.dateofreceiving}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {filteredRecords.length === 0 && (
          <div className="flex justify-center text-4xl font-bold w-full p-5">
            <p className="text-center">No results found</p>
          </div>
        )}
      </main>

      {/* <div className="flex items-center my-5 px-5">
        <button className="flex items-center bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
          <CiEdit />
          <p className="ml-2">Edit</p>
        </button>
        <button className="flex items-center ml-4 border-2 border-red-500 text-red-500 px-5 py-2 rounded-lg shadow-lg">
          <CiTrash />
          <p className="ml-2">Delete</p>
        </button>
      </div> */}
    </section>
  );
};

export default Search;
