import { useContext } from "react";
import { invoke } from "@tauri-apps/api";
import { FormEvent, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RiLock2Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { saveToLocalStorage } from "../utils/localStorage";
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
        username: loginUserName,
        password: loginUserPassword,
      });

      const loggedInUser: IUserLogin = JSON.parse(
        await invoke("login_command", { user })
      );
      setLoggedInUser(loggedInUser);
      saveToLocalStorage(loggedInUser);
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      toast.error("Wrong credentials");
    }
  };

  return (
    <section className="relative flex justify-center items-center w-full h-screen text-gray-600 text-sm font-light p-3 ">
      <form onSubmit={handleLoginFormSubmit} className="w-[300px] mx-auto">
        <h1 className="text-4xl text-center font-bold text-black">Login</h1>
        <p className="text-xs text-center mt-2 mb-8">
          HMH Folder Management System
        </p>
        <section>
          <div className="grid mb-3">
            <label htmlFor="" className="text-sm">
              Username
            </label>
            <div className="flex items-center border-2 rounded-lg border-gray-200">
              <BsPerson className="text-lg mx-2" />
              <input
                type="text"
                onChange={(event) => setLoginUserName(event.target.value)}
                value={loginUserName}
                min={5}
                maxLength={20}
                className="w-full rounded-lg p-2 outline-0"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="grid mb-3">
            <label htmlFor="" className="text-sm">
              Password
            </label>
            <div className="flex items-center border-2 rounded-lg border-gray-200">
              <RiLock2Line className="text-lg mx-2" />
              <input
                type="password"
                onChange={(event) => setLoginUserPassword(event.target.value)}
                value={loginUserPassword}
                className="w-full rounded-lg p-2 outline-0"
                placeholder="**********"
              />
            </div>
          </div>
        </section>
        <button className="px-5 p-2 bg-blue-600 text-white w-full my-3 rounded-lg shadow-lg">
          Login into account
        </button>
      </form>
      <div className="fixed right-10 bottom-5 border-2 border-gray-200 px-5 py-2 rounded-lg shadow-lg">
        <select name="" id="">
          <option value="">Light Mode</option>
          <option value="">Dark Mode</option>
        </select>
      </div>
    </section>
  );
};

export default LoginPage;
