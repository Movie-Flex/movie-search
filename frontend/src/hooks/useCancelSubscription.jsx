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
        `https://movie-flex-open-soft2024-backend.vercel.app/payment/cancel?q=refundInfo`,
        {} ,{
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
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
        `https://movie-flex-open-soft2024-backend.vercel.app/payment/cancel?q=refundTrue`,
        {} ,{
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
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
