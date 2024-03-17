import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3002/api/login",
        loginData
      );
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      console.log(response);
      await TokenVerify(response.data.token);
      setIsLoggedIn(true);
      toast.success("Login Successful");
    } catch (error) {
      setIsLoading(false);
      toast.error("Login Failed");
    }
  };

  const TokenVerify = async (token) => {
    try {
      const tokenObject = { token: token };
      const response = await axios.post(
        "http://localhost:3002/api/getUser",
        tokenObject
      );
      console.log(response);

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("TokenVerify Error", error);
    }
  };

  return { login };
};
