import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const handleLoginFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!loginUserName || !loginUserPassword) return;
    console.log(loginUserName, loginUserPassword);
    setLoginUserName("");
    setLoginUserPassword("");
  };

  return (
    <section className="relative flex justify-center items-center w-full h-screen text-gray-600 text-sm font-light p-3 ">
      <form onSubmit={handleLoginFormSubmit} className="w-[300px] mx-auto">
        <h1 className="text-4xl text-center my-5 font-bold text-black">
          Login
        </h1>

        <section>
          <div className="grid mb-3">
            <label htmlFor="" className="text-sm">
              Username
            </label>
            <input
              type="text"
              onChange={(event) => setLoginUserName(event.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2"
              placeholder="Enter your username"
            />
          </div>
          <div className="grid mb-3">
            <label htmlFor="" className="text-sm">
              Password
            </label>
            <input
              type="password"
              onChange={(event) => setLoginUserPassword(event.target.value)}
              className="border-2 border-gray-200 rounded-lg p-2"
              placeholder="**********"
            />
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
