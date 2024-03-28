import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignUp";
import checkStrongNess from "../utils/PasswordCheck";
import { useStatStyles } from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useSignup();

  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleSignup = async (e, signupData) => {
    e.preventDefault();
    try {
      await signup(signupData);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <section class="bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create and account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your name
                </label>
                <input
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  type="name"
                  name="name"
                  id="name"
                  class=" sm:text-sm rounded-lg focus:ring-primary-600
                   focus:border-primary-600 block w-full p-2.5 bg-white-700 border-white-600 placeholder-gray-400
                    text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your username
                </label>
                <input
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                  type="username"
                  username="username"
                  id="username"
                  class=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                   block w-full p-2.5 bg-white-700 border-white-600 placeholder-gray-400 text-black
                    focus:ring-blue-500 focus:border-blue-500"
                  placeholder="username"
                  required=""
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  type="email"
                  name="email"
                  id="email"
                  class=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                   block w-full p-2.5 bg-white-700 border-white-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
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
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      });
                      setPasswordStrength(checkStrongNess(e.target.value));
                    }}
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class=" sm:text-sm rounded-lg focus:ring-primary-600
                   focus:border-primary-600 block w-full p-2.5 bg-white-700 border-white-600 placeholder-gray-400
                    text-black focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />

                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg
                      className={`h-6 text-white-700 ${
                        show ? "hidden" : "block"
                      }`}
                      fill="none"
                      onClick={toggleShow}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      />
                    </svg>

                    <svg
                      className={`h-6 text-white-700 ${
                        show ? "block" : "hidden"
                      }`}
                      fill="none"
                      onClick={toggleShow}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm justify-items-end font-light flex  text-gray-400">
                  Password strength:{" "}
                  <span
                    className={`font-medium ${
                      passwordStrength === "Weak" ||
                      passwordStrength === "Medium"
                        ? "text-red-400"
                        : "text-green-400"
                    }
                   + "font-medium text-primary-500`}
                  >
                    {passwordStrength}
                  </span>
                </p>
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="sm:text-sm rounded-lg focus:ring-primary-600
                   focus:border-primary-600 block w-full p-2.5 bg-white-700 border-white-600 placeholder-gray-400
                    text-black focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border  rounded focus:ring-3 focus:ring-primary-300 bg-gray-700
                     border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-300">
                    <Link
                      class="font-medium  hover:underline text-primary-500"
                      href="/terms"
                    >
                      I accept the Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  handleSignup(e, signupData);
                }}
                type="submit"
                class="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
                px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800  text-white"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-white">
                Already have an account?{" "}
                <Link
                  to="/login"
                  class="font-medium  text-white hover:underline "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
