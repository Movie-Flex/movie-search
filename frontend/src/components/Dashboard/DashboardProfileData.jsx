import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useUpdateProfile } from "../../hooks/useUpdateprofile";

export default function DashboardProfileData({ sideNav, setSideNav }) {
  const { user, extraUserData } = useContext(UserContext);
  const { getUpdatedProfile } = useUpdateProfile();
  const [loading, setLoading] = useState(true);

  const fetchExtraUserData = async () => {
    try {
      // setLoading(false);
      await getUpdatedProfile();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExtraUserData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div class=" w-9/12 mx-2 h-64">
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span clas="text-green-500">
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span class="tracking-wide">About</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">First Name</div>
              <div class="px-4 py-2">
                {user.name.split(" ")[0] ? user.name.split(" ")[0] : " "}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Last Name</div>
              <div class="px-4 py-2">
                {user.name.split(" ")[1] ? user.name.split(" ")[1] : " "}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Username</div>
              <div class="px-4 py-2">{user.username ? user.username : " "}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Gender</div>
              <div class="px-4 py-2">
                {extraUserData.gender ? extraUserData.gender : "Not Updated"}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Contact No.</div>
              <div class="px-4 py-2">
                {extraUserData.phone ? extraUserData.phone : "Not Updated"}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Current Address</div>
              <div class="px-4 py-2">
                {extraUserData.address ? extraUserData.address : "Not Updated"}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Email.</div>
              <div class="px-4 py-2">
                <a class="text-blue-800" href="mailto:jane@example.com">
                  {user.email ? user.email : "Not Updated"}
                </a>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Birthday</div>
              <div class="px-4 py-2">
                {extraUserData.dob ? extraUserData.dob : "Not Updated"}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Subscription</div>
              <div class="px-4 py-2">
                {user.subscription ? user.subscription : "free"}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setSideNav(5);
          }}
          class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
        >
          Update Information
        </button>
      </div>

      <div class="my-4"></div>
    </div>
  );
}
