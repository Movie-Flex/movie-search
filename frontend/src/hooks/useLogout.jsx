import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate=useNavigate()
  const { setIsLoggedIn, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUser({});
      setIsLoading(false);
      toast.success("Logout Successful");
      navigate("/")
    } catch (error) {
      setIsLoading(false);
      toast.error("Logout Failed");
    }
    
  };

  

  return { logout };
};
