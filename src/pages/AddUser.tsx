import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { AiOutlinePlus } from "react-icons/ai";

interface IAccounts {
  id: number;
  username: string;
  password: string;
  role: string;
}

const AddUser = () => {
  const [accounts, setAccounts] = useState<IAccounts[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setAccounts(JSON.parse(await invoke("get_all_users_command")));
      } catch (error) {
        console.error("Failed to get users:", error);
      }
    };

    getAllUsers();
  }, []);
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
            {accounts.map((account) => {
              return (
                <tr key={account.id}>
                  <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                    {account.username}
                  </td>
                  <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap">
                    {account.password}
                  </td>
                  <td className="text-center  border-b-2 px-5 py-3 whitespace-nowrap">
                    {account.role}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AddUser;
