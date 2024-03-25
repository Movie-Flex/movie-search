import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import CancelSubscriptionModal from "./CancelSubscription/CancelSubscriptionModal";
import UserDetails from "../components/UserDetails";
import DashboardSideBar from "../components/Dashboard/DashboardSideBar";
import DashBoardCards from "../components/Dashboard/DashboardCards";
import DashboardProfileData from "../components/Dashboard/DashboardProfileData";

export default function Profile() {
  const navigate = useNavigate();
  const {  isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    navigate("/login");
  }

  

  return (
    <div class="min-h-screen bg-gray-100">
      <DashboardSideBar />
      <div class="p-4 xl:ml-80">
        <div class="mt-12">
          <DashBoardCards/>

          <DashboardProfileData/>
        </div>
      </div>
    </div>
  );

  // return (
  //     <div>
  //       <h1 className="flex justify-center items-center">Profile Page just made for testing</h1>
  //       {user &&(
  //        <UserDetails user={user}/>
  //       )}

  //       <div
  //       className="flex justify-center space-x-4 mt-4"
  //       >


  //      </div>
  //     </div>
  //   );
}
