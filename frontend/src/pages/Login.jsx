import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login } = useLogin();
  const navigate=useNavigate();

  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleLogin = async (e, loginData) => {
    e.preventDefault();
    console.log(loginData);
    try {
      await login(loginData);
      
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <section class="bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="userId"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your Email/Username
                </label>
                <input
                  onChange={(e) =>
                    setLoginData({ ...loginData, userId: e.target.value })
                  }
                  type="userId"
                  name="userId"
                  id="userId"
                  class=" border sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 bg-white-700 border-white-600 placeholder-white-400 text-white
                   focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">

                <input
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  type={show ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class=" border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5 bg-white-700 border-white-600 placeholder-white-400 focus:ring-blue-500 focus:border-blue-500"
                  required=""
                  />

<div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
      <svg
        className={`h-6 text-white ${show ? 'hidden' : 'block'}`}
        fill="none"
        onClick={toggleShow}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
      </svg>

      <svg
        className={`h-6 text-white ${show ? 'block' : 'hidden'}`}
        fill="none"
        onClick={toggleShow}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
      </svg>
    </div>
           
                  </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border  rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700
                       border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class=" text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href=""
                  class="text-sm font-medium text-white hover:underline "
                >
                  Forgot password?
                </Link>
              </div>
              <button
                onClick={(e) => {
                  handleLogin(e, loginData);
                }}
                type="submit"
                class="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800   text-white"
              >
                Sign in
              </button>
              <p class="text-sm text-white">
                Don't have an account yet?
                <Link
                  to="/signup"
                  class="font-medium  text-white hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
