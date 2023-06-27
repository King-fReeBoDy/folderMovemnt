import { invoke } from "@tauri-apps/api";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface ICreateUser {
  handleCreateUserModal: () => void;
}

const CreateUser = ({ handleCreateUserModal }: ICreateUser) => {
  const [createUser, setCreateUser] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const handleCreateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setCreateUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createUserFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (
        !createUser.username ||
        !createUser.password ||
        !createUser.confirmpassword ||
        !createUser.role
      ) {
        toast.error("Input all fields");
        return;
      }

      if (createUser.password !== createUser.confirmpassword) {
        toast.error("Password do not match");
        return;
      }
      const user = JSON.stringify({
        username: createUser.username.toUpperCase(),
        password: createUser.password,
        role: createUser.role,
      });
      await invoke("create_users_command", { user });
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="relative text-sm">
      <div
        onClick={handleCreateUserModal}
        className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"
      ></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg dark:bg-gray-900">
        <form onSubmit={createUserFormSubmit} className="w-[400px]">
          <h2 className="text-2xl text-black font-bold text-center mb-5 dark:text-gray-300">
            Create User Account
          </h2>

          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Username <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="username"
              onChange={handleCreateChange}
              className="p-2 border-2 rounded-lg w-full uppercase dark:bg-gray-700 dark:border-gray-700"
            />
          </div>
          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Role <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="role"
              id=""
              onChange={handleCreateChange}
              className="p-2 border-2 rounded-lg w-full dark:bg-gray-700 dark:border-gray-700"
            >
              <option value=""> -- CHOOSE ROLE --</option>
              <option value="ADMIN">ADMIN</option>
              <option value="WORKER">WORKER</option>
            </select>
          </div>
          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={handleCreateChange}
              className="p-2 border-2 rounded-lg w-full dark:bg-gray-700 dark:border-gray-700"
            />
          </div>
          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Confirm Password <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              onChange={handleCreateChange}
              className="p-2 border-2 rounded-lg w-full dark:bg-gray-700 dark:border-gray-700"
            />
          </div>

          <div className="flex items-center ">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
              <p className="">Create Account</p>
            </button>
            <button
              onClick={handleCreateUserModal}
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
            >
              <p className="">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
