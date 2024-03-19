import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";

export default function Dummy() {

  const {user,isLoggedIn}=useContext(UserContext);
  const navigate=useNavigate()

  if(!isLoggedIn) {
    navigate("/login")
  }


  const {logout}=useLogout();
  
  return (
      <div>
        <h1>Dummy</h1>
        {/* {user.name}
        {user.email} */}

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
        
      </div>
    );
}