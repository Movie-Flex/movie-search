import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useContext, useState } from "react";
import { useCancelSubscription } from "../../hooks/useCancelSubscription";
import { UserContext } from "../../context/UserContext";
import CancelSubscriptionModal from "../../pages/CancelSubscription/CancelSubscriptionModal";

export default function DashboardSideBar({
  setCancelSubscriptionButton,
  refundDetailsFetch,
}) {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { user, sideNav, setSideNav } = useContext(UserContext);

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
            Movie Flex Dashboard
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Profile
                </p>
              </button>
            </div>
          </li>

          <li>
            <Link
              onClick={() => {
                setSideNav(2);
              }}
              class=""
              to="/"
            >
              <button
                class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg
                 text-white w-full flex items-center gap-4 px-4 capitalize  hover:bg-white/10 active:bg-white/30 ${
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
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Home
                </p>
              </button>
            </Link>

            {user.subscription !== "free" && (
              <button
                onClick={() => {
                  setCancelSubscriptionButton(true);
                  refundDetailsFetch();
                  setSideNav(3);
                }}
                class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize ${
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
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Cancel Subscription
                </p>
              </button>
            )}
          </li>
          <li>
            <Link
              onClick={() => {
                setSideNav(4);
              }}
              class=""
              to="/subscription"
            >
              <button
                class={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none 
                text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize ${
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
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Buy Subscription
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/getYourMovies">
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
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Your Movies
                </p>
              </button>
            </Link>
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
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
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
