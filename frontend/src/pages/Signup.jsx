import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/handleError";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    const copySingipInfo = { ...signupInfo };
    copySingipInfo[name] = value;
    setSignupInfo(copySingipInfo);
  };
  console.log("SignUp->", signupInfo);

  const handleSingUp = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = signupInfo;

    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fileds are required");
    }

    // const url = "http://localhost:8080/api/v1/user/signup";
    // axios
    //   .get(url, signupInfo)
    //   .then((Response) => console.log(Response))
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-col bg-slate-300">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-4xl block text-center m-4 p-4 font-semibold font-serif">
            MY BLOG
          </h1>
          <hr className="mt-3"></hr>
          <form className="mt-7" onSubmit={handleSingUp}>
            <div>
              <label className="block mb-2 text-base" htmlFor="name">
                Name:
              </label>
              <input
                onChange={handleChnage}
                type="text"
                name="name"
                placeholder="Enter your name..."
                autoFocus
                value={signupInfo.name}
                className="border w-full text-base px-2 py-1 focus:outline-none  focus:ring-0 focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-base" htmlFor="email">
                Email:
              </label>
              <input
                onChange={handleChnage}
                type="text"
                name="email"
                placeholder="Enter your email..."
                autoFocus
                value={signupInfo.email}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-base" htmlFor="password">
                Password:
              </label>
              <input
                onChange={handleChnage}
                type="text"
                name="password"
                placeholder="Enter your password..."
                autoFocus
                value={signupInfo.password}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              />
            </div>

            <div>
              <label
                className="block mb-2 text-base"
                htmlFor="confirm-password"
              >
                Confirm Password:
              </label>
              <input
                onChange={handleChnage}
                type="text"
                name="confirmPassword"
                placeholder="confirm password..."
                autoFocus
                value={signupInfo.value}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="py-2  text-base text-white bg-indigo-900 mt-3 rounded-md w-full border-2 border-indigo-700 hover:bg-transparent hover:text-indigo-700 font-semibold"
            >
              SIGN UP
            </button>
          </form>

          <div className=" mt-3 mb-2">
            Already have an account ?
            <Link to="/login" className="font-semibold ml-3 text-indigo-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
