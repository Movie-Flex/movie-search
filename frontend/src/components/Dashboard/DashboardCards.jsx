import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const user = {
  name: "zx",
  email: "zx@gmail.com",
  username: "zx",
  role: "standard_user",
  subscription: "free",
  createdAt: "2024-03-22T15:18:19.806Z",
  issuedAt: 1711365039800,
  iat: 1711365039,
  exp: 1711371039,
};
export default function DashBoardCards() {
  const { user } = useContext(UserContext);
  return (
    <div class="w-3/12 md:mx-2">
      <div class="bg-white p-3 border-t-4 border-green-400">
        <div class="image overflow-hidden">
          <img
            class="h-auto w-full mx-auto"
            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
            alt=""
          />
        </div>
        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
          {user.name ? user.name : " "}
        </h1>

        <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li class="flex items-center py-3">
            <span>Status</span>
            <span class="ml-auto">
              <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                Active
              </span>
            </span>
          </li>
          <li class="flex items-center py-3">
            <span>Joined On</span>
            <span class="ml-auto">
              {user.createdAt ? new Date(user.createdAt).toDateString() : " "}
            </span>
          </li>
        </ul>
      </div>

      <div class="my-4"></div>
    </div>
  );
}
