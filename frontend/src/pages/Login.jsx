import React from "react";

function LogIn() {
  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-col bg-slate-300">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-4xl block text-center m-4 p-4 font-semibold font-serif">
            MY BLOG
          </h1>
          <hr className="mt-3"></hr>
          <form className="mt-7">
            <div>
              <label className="block mb-2 text-base" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email..."
                autoFocus
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-base" htmlFor="password">
                Password:
              </label>
              <input
                type="text"
                name="password"
                placeholder="Enter your password..."
                autoFocus
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              />
            </div>

            <div className="flex flex-row justify-between mt-3 mb-2 items-center">
              <div>
                <input type="checkbox" className="mr-2" />
                <label>Remember Me</label>
              </div>
              <div>
                <a href="#" className="text-indigo-800 font-semibold">
                  Forget Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="py-2  text-base text-white bg-indigo-900 mt-3 rounded-md w-full border-2 border-indigo-700 hover:bg-transparent hover:text-indigo-700 font-semibold"
            >
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
