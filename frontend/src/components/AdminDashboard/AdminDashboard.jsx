import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import DashBoardCards from "./AdminDashboardCards";
import DashboardSideBar from "./AdminDashboardSideBar";
import DashboardProfileData from "./AdminDashboardProfileData";
import { UserContext } from "../../context/UserContext";
import UpdateInfo from "../UpdateUserInformation/UpdateInfo";
import AddMovie from "./AdminFunctionalities/AddMovie";
import DeleteMovie from "./AdminFunctionalities/DeleteMovie";
import MakeAdmin from "./AdminFunctionalities/MakeAdmin";
import UserSubscriptionInfo from "./AdminFunctionalities/UserSubsciptionInfo";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const [sideNav, setSideNav] = useState(1);


  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div class="min-h-screen bg-gray-100">
      <DashboardSideBar
        sideNav={sideNav}
        setSideNav={setSideNav}
      />
      <div class="p-4 xl:ml-80">
        {sideNav === 1 && (
          <div class="mt-12">
            <DashBoardCards />
            <DashboardProfileData sideNav={sideNav} setSideNav={setSideNav} />
          </div>
        )}


        {sideNav===2 && <AddMovie/>}
        {sideNav===3 && <DeleteMovie/>}
        {sideNav === 4 && <UserSubscriptionInfo />}
        {sideNav===5 &&  <MakeAdmin/>}

       
        {sideNav === 6 && <UpdateInfo />}
      </div>
    </div>
  );
}
