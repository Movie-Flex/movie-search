import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import CancelSubscriptionModal from "./CancelSubscription/CancelSubscriptionModal";
import UserDetails from "../components/UserDetails";

export default function Profile() {

  const navigate=useNavigate()
  const {logout}=useLogout();
  const {user,isLoggedIn}=useContext(UserContext);
  const [cancelSubscriptionButton, setCancelSubscriptionButton] = useState(false);

  const {cancelSubscriptionInfo}=useCancelSubscription();

  const logoutAction=()=>{
    logout();
    navigate('/')
    window.location.reload();

}



  if(!isLoggedIn) {
    navigate("/login")
  }
  
  const [refundInfo,setRefundInfo]=useState({});

  const refundDetailsFetch=async()=>{
   try{
       const response=await cancelSubscriptionInfo();
        setRefundInfo(response.refundDetails);
   }
   catch(error){
       console.log("Error",error);
   }
  }

  
  return (
      <div>
        <h1 className="flex justify-center items-center">Profile Page just made for testing</h1>
        {user &&(
         <UserDetails user={user}/>
        )}

        <div
        className="flex justify-center space-x-4 mt-4"
        >
        <button 
        onClick={()=>navigate("/")}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Home

        </button >
        <button 
        onClick={logoutAction}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Logout

        </button >

        <Link 
        to="/subscription"
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Subscription
        </Link >
        
        {user.subscription!=="free" &&<button 
        onClick={() => {
          setCancelSubscriptionButton(true)
          refundDetailsFetch()
        }}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Cancel Subscription
        </button >}

        {cancelSubscriptionButton && <CancelSubscriptionModal  refundInfo={refundInfo} closeModal={setCancelSubscriptionButton}/>}
        </div>       
      </div>
    );
}