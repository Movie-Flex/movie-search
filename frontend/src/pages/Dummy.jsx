import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import { CancelSubscription } from "../hooks/useCancelSubscription";

export default function Dummy() {

  const {user,isLoggedIn}=useContext(UserContext);
  const navigate=useNavigate()

  if(!isLoggedIn) {
    navigate("/login")
  }


  const {logout}=useLogout();


  const cancel = async () => {
    try {
      const data = await CancelSubscription();
    } catch (error) {
      console.error('Error fetching amount details:', error);
    }
  };
 
  
  return (
      <div>
        <h1 className="flex justify-center items-center">Dummy</h1>
        <h1 className="flex justify-center items-center">Welcome: {user.name}</h1>
        <h1 className="flex justify-center items-center">Email: {user.email}</h1>
        <h1 className="flex justify-center items-center">Subscription: {user.subscription}</h1>

        <div
        className="flex justify-center space-x-4 mt-4"
        >
        <button 
        onClick={logout}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Logout

        </button >

        <Link 
        to="/subscription"
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Subscription
        </Link >
        
        <button 
        onClick={cancel}
        
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Cancel Subscription
        </button >
        </div>       
      </div>
    );
}