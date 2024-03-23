import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useLogin } from "./useLogin";

export const useCancelSubscription =  () => {
  const { token, setToken } = useContext(UserContext);

  const { TokenVerify } = useLogin();

  const cancelSubscriptionInfo=async()=>{
    try {

      const response = await axios.post(
        `http://localhost:3002/payment/cancel?q=refundInfo`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        toast.success("refund info fetched Successfully");
        return response.data;
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Subscription Cancellation Failed");
    }
  }

  const  cancelSubscription = async () => {
    try {

      const response = await axios.post(
        `http://localhost:3002/payment/cancel?q=refundTrue`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
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

  return { cancelSubscription ,cancelSubscriptionInfo};
};
