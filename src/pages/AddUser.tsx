import { AiOutlinePlus } from "react-icons/ai";

const AddUser = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-4xl font-bold my-5 text-black">
          👨‍⚕️ Admin Dashboard
        </h1>
        <button className="flex items-center bg-blue-600 text-white px-3 py-2 shadow-md rounded-lg">
          <AiOutlinePlus />
          <p className="ml-2">Add New User</p>
        </button>
      </div>

      <main className="overflow-y-auto h-[400px] px-5">
        <table className="text-xs w-full">
          <thead className="">
            <tr className="">
              <th className="border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                Username
              </th>
              <th className="border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                Password
              </th>
              <th className=" border-b-2 px-5 py-3 whitespace-nowrap">
                User Role
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                Desmond Kudjuh
              </td>
              <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                *************
              </td>
              <td className="text-center  border-b-2 px-5 py-3 whitespace-nowrap">
                Admin
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AddUser;
