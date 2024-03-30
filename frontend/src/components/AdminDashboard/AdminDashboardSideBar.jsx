import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function DashboardSideBar({
  sideNav,
  setSideNav,
  setCancelSubscriptionButton,
  refundDetailsFetch,
}) {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { user } = useContext(UserContext);

  const logoutAction = () => {
    logout();
    navigate("/");
    window.location.reload();
  };
  return (
    <aside class="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div class="relative border-b border-white/20">
        <a class="flex items-center gap-4 py-6 px-8" href="#/">
          <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Movie Flex Admin Dashboard
          </h6>
        </a>
        <button
          class="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-5 w-5 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div class="m-4">
        <ul class="mb-4 flex flex-col gap-1">
          <li>
            <div>
              <button
                onClick={() => {
                  setSideNav(1);
                }}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none
                 text-xs py-3 rounded-lg  text-white  w-full flex items-center gap-4 px-4 capitalize ${
                   sideNav === 1
                     ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                     : " hover:bg-white/10 active:bg-white/30"
                 }`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="profile"
                  class="w-5 h-5 text-inherit"
                >
                  <g
                    data-name="Layer 2"
                    fill="#ffffff"
                    class="color000000 svgShape"
                  >
                    <circle
                      cx="16"
                      cy="6.96"
                      r="6"
                      fill="#ffffff"
                      class="color000000 svgShape"
                    ></circle>
                    <path
                      d="M30.86,26.84a15.07,15.07,0,0,0-4.11-7.47A12.47,12.47,0,0,0,25.13,18,15,15,0,0,0,16,15,15.24,15.24,0,0,0,5.24,19.37a15.07,15.07,0,0,0-4.11,7.47,3.42,3.42,0,0,0,.69,2.88A3.52,3.52,0,0,0,4.58,31H27.42a3.52,3.52,0,0,0,2.75-1.32A3.42,3.42,0,0,0,30.86,26.84Z"
                      fill="#ffffff"
                      class="color000000 svgShape"
                    ></path>
                  </g>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Profile
                </p>
              </button>
            </div>
          </li>

          <li>
            <button
              onClick={() => {
                setSideNav(2);
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 2
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M11 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Add Movie
              </p>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setSideNav(3);
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 3
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-1 4h-4V6h4v2zm-7 0H6V6h5v2zm5 0v2h-4V6h4zM6 12v6h12v-6H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Delete Movie
              </p>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setSideNav(4);
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 4
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1a1 1 0 00-1 1v5a1 1 0 11-2 0V2a3 3 0 013-3h0a3 3 0 013 3v4a1 1 0 11-2 0V2a1 1 0 00-1-1zM12 13a1 1 0 00-1 1v5a1 1 0 11-2 0v-5a3 3 0 016 0v5a1 1 0 11-2 0v-5a1 1 0 00-1-1zM3 6a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1H3zm18 2H3v10h18V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Subscribers Info
              </p>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setSideNav(5);
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 5
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0zM20.25 5A3.75 3.75 0 0124 8.75v6.5a3.75 3.75 0 01-3.75 3.75H3.75A3.75 3.75 0 010 15.25v-6.5A3.75 3.75 0 013.75 5h16.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Approve Admin
              </p>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setSideNav(6);
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 6
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1a1 1 0 00-1 1v9.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L13 11.586V2a1 1 0 00-1-1zm-2 16.414V23a1 1 0 001 1h4a1 1 0 001-1v-5.586l1.293 1.293a1 1 0 101.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 17.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Update Information
              </p>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSideNav(7);
                navigate("/");
              }}
              class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize ${
                sideNav === 7
                  ? " shadow-blue-500/20 hover:shadow-lg  hover:shadow-blue-500/40 active:opacity-[0.85] shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                  : " hover:bg-white/10 active:bg-white/30"
              }`}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
              </svg>
              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Home
              </p>
            </button>
          </li>

          <li>
            <button
              onClick={logoutAction}
              class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Logout
              </p>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
