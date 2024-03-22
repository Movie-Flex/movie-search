import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()

  const login = async (loginData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3002/api/login",
        loginData
      );
      setIsLoading(false);
     if(response.status===200){
      localStorage.setItem("token", response.data.token);
      await TokenVerify(response.data.token);
      setIsLoggedIn(true);
      toast.success("Login Successful");
      navigate("/dummy")
     }

     else{
      setIsLoading(false);
      toast.error(response.data.message);
     }
      

    } catch (error) {
      setIsLoading(false);
      toast.error("Login Failed");
    }
  };

  const TokenVerify = async (token) => {
    try {
      console.log("TokenVerify", token);
      const tokenObject = { token: token };
      const response = await axios.post(
        "http://localhost:3002/api/getUser",
        tokenObject
      );
      // console.log(response);

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("TokenVerify Error", error);
    }
  };

  return { login,TokenVerify };
};
