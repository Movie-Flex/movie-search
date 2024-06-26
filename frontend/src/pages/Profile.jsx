import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import CancelSubscriptionModal from "./CancelSubscription/CancelSubscriptionModal";
import DashboardSideBar from "../components/Dashboard/DashboardSideBar";
import DashBoardCards from "../components/Dashboard/DashboardCards";
import DashboardProfileData from "../components/Dashboard/DashboardProfileData";
import UpdateInfo from "../components/UpdateUserInformation/UpdateInfo";
import  { CancelContext } from "../context/CancelContext";

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const { sideNav, setSideNav } = useContext(UserContext);

  const {cancelSubscriptionButton, setCancelSubscriptionButton} =useContext(CancelContext);
  const { cancelSubscriptionInfo } = useCancelSubscription();
  const [refundInfo, setRefundInfo] = useState({});
  const refundDetailsFetch = async () => {
    try {
      const response = await cancelSubscriptionInfo();
      setRefundInfo(response.refundDetails);
    } catch (error) {
      console.log("Error", error);
    }
  };

 
  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div class="min-h-screen bg-gray-100">
      <DashboardSideBar
        sideNav={sideNav}
        setSideNav={setSideNav}
        refundDetailsFetch={refundDetailsFetch}
        setCancelSubscriptionButton={setCancelSubscriptionButton}
      />
      <div class="p-4 xl:ml-80">
        {sideNav === 1 && (
          <div class="mt-12">
            <DashBoardCards />
            <DashboardProfileData sideNav={sideNav} setSideNav={setSideNav} />
          </div>
        )}

        {/* //the sidenav 2 is reserved for go back */}
        {/* //the sidenav 4 is reserved for subscription */}

        {sideNav === 3 && cancelSubscriptionButton && (
          <CancelSubscriptionModal
            refundInfo={refundInfo}
            refundDetailsFetch={refundDetailsFetch}
            closeModal={setCancelSubscriptionButton}
          />
        )}

        {sideNav === 5 && <UpdateInfo />}

        {(sideNav !== 1 && sideNav !== 3 && sideNav !== 5) && (
          <div className="text-center mt-8 text-red-500">
            Please select an option
          </div>
        )}
      </div>
    </div>
  );
}
