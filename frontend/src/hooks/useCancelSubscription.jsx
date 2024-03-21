import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useLogin } from "./useLogin";

export const useCancelSubscription =  () => {
  const { token, setToken } = useContext(UserContext);

  const { TokenVerify } = useLogin();

  const  cancelSubscription = async () => {
    try {

      const tokenObject = { token: token };
      const response = await axios.post(
        "http://localhost:3002/payment/cancel",
        tokenObject
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setToken(response.data.newToken);
        console.log("New Token", response.data.newToken);

        await TokenVerify(response.data.newToken);

        return response.data;
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Subscription Cancellation Failed");
    }
  };

  return { cancelSubscription };
};
