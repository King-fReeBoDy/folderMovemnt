import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { AiOutlinePlus } from "react-icons/ai";
import CreateUser from "../components/CreateUser";

interface IAccounts {
  id: number;
  username: string;
  password: string;
  role: string;
}

const AddUser = () => {
  const [accounts, setAccounts] = useState<IAccounts[]>([]);
  const [createUserModal, setCreateUserModal] = useState(false);

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

  const handleCreateUserModal = () => {
    setCreateUserModal(!createUserModal);
  };
  return (
    <section className="w-full">
      {createUserModal && (
        <CreateUser handleCreateUserModal={handleCreateUserModal} />
      )}
      <div className="flex items-center justify-between p-5">
        <h1 className="text-4xl font-bold my-5 text-black dark:text-gray-300">
          👨‍⚕️ Admin Dashboard
        </h1>
        <button
          onClick={handleCreateUserModal}
          className="flex items-center bg-blue-600 text-white px-3 py-2 shadow-md rounded-lg dark:bg-blue-900 dark:text-gray-400"
        >
          <AiOutlinePlus />
          <p className="ml-2">Add New User</p>
        </button>
      </div>

      <main className="overflow-y-auto h-[400px] px-5 border-t-2 dark:border-gray-700">
        <table className="text-xs w-full">
          <thead className="">
            <tr className="">
              <th className="border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Username
              </th>
              <th className="border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                Password
              </th>
              <th className=" border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                User Role
              </th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => {
              return (
                <tr key={account.id}>
                  <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                    {account.username}
                  </td>
                  <td className="text-center border-r-2 border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
                    {account.password}
                  </td>
                  <td className="text-center  border-b-2 px-5 py-3 whitespace-nowrap dark:border-gray-700">
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
