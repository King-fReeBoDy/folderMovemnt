import { useContext } from "react";
import { invoke } from "@tauri-apps/api";
import { FormEvent, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RiLock2Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { saveToSessionStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
interface IUserLogin {
  username: string;
  password: string;
  role: string;
}

const LoginPage = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const handleLoginFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!loginUserName || !loginUserPassword) {
      toast.error("Input all fields");
      return;
    }
    try {
      setLoginUserName("");
      setLoginUserPassword("");

      const user = JSON.stringify({
        username: loginUserName.toUpperCase(),
        password: loginUserPassword,
      });

      const loggedInUser: IUserLogin = JSON.parse(
        await invoke("login_command", { user })
      );
      setLoggedInUser(loggedInUser);
      saveToSessionStorage(loggedInUser);
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      toast.error("Wrong credentials");
    }
  };

  return (
    <section className="relative flex justify-center items-center w-full h-screen text-gray-600 text-sm font-light p-3 dark:bg-gray-900 dark:text-gray-400">
      <form onSubmit={handleLoginFormSubmit} className="w-[300px] mx-auto">
        <h1 className="text-4xl text-center font-bold text-black dark:text-gray-300">
          Login
        </h1>
        <p className="text-xs text-center mt-2 mb-8">
          HMH Folder Management System
        </p>
        <section>
          <div className="grid mb-3">
            <label htmlFor="" className="text-xs">
              Username
            </label>
            <div className="flex items-center border-2 rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              <BsPerson className="text-lg mx-2" />
              <input
                type="text"
                onChange={(event) => setLoginUserName(event.target.value)}
                value={loginUserName}
                min={5}
                maxLength={20}
                className="w-full rounded-lg p-2 outline-0 uppercase placeholder:normal-case border-gray-200 dark:bg-gray-700"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="grid mb-3">
            <label htmlFor="" className="text-xs">
              Password
            </label>
            <div className="flex items-center border-2 rounded-lg border-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              <RiLock2Line className="text-lg mx-2 dark:text-gray-500" />
              <input
                type="password"
                onChange={(event) => setLoginUserPassword(event.target.value)}
                value={loginUserPassword}
                className="w-full rounded-lg p-2 outline-0 dark:bg-gray-700 dark:border-gray-700"
                placeholder="**********"
              />
            </div>
          </div>
        </section>
        <button className="px-5 p-2 bg-blue-600 text-white w-full my-3 rounded-lg shadow-lg dark:bg-blue-900 dark:text-gray-400">
          Login into account
        </button>
      </form>
      <div className="fixed right-10 bottom-5 dark:text-gray-400">
        <select
          name=""
          id=""
          className="border-2 border-gray-200 px-5 py-2 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-700"
        >
          <option value="">Light Mode</option>
          <option value="">Dark Mode</option>
        </select>
      </div>
    </section>
  );
};

export default LoginPage;
