import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

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
         className="button 
        bg-primary-600 
        ">
          Logout

        </button >
      </div>
    );
}