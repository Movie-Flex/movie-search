import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { CancelContext } from "../../../context/CancelContext";

export default function SubscriptionDiamond({ props, yearly, setYearly }) {
  const navigate = useNavigate();

  const { features, currency, subunit, feeYearly, feeMonthly } = props;

  const {
    user,
    setPaymentGatewaySendingData,
    token,
    setPaymentGatewayReceivingData,
    setSideNav,
  } = useContext(UserContext);

  const{setCancelSubscriptionButton}=useContext(CancelContext);

  const handleDiamondSubscription = async () => {
    setPaymentGatewaySendingData({
      dur: yearly ? "feeYearly" : "feeMonthly",
      type: "diamond",
    });

    try {
      const response = await axios.post(
        `https://movie-flex-open-soft2024-backend.vercel.app/payment/order?dur=${yearly ? "feeYearly" : "feeMonthly"}&type=diamond`,

        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "paymentGatewayReceivingData",
          JSON.stringify(response.data)
        );
        setPaymentGatewayReceivingData(response.data);
        navigate("/paymentgateway");
      } else {
        console.log("error");
      }
    } catch (error) {}
  };

  return (
    <div
      className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border 
    shadow border-gray-600 xl:p-8 bg-gray-800 text-white"
    >
      <h3 className="mb-4 text-2xl font-semibold">Diamond</h3>
      <p className="font-light sm:text-lg text-gray-400">
        Includes Diamond Features and Access
      </p>

      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-3xl ">
          {currency} {yearly ? feeYearly : feeMonthly}
        </span>
        <span className=" text-gray-400">
          {yearly ? "/yearly" : "/monthly"}
        </span>
      </div>

      <ul className="mb-8 space-y-4 text-left">
        {features.map((data, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{data}</span>
          </li>
        ))}
      </ul>

      {user.subscription !== "diamond" ? (
        user.subscription === "free" ? (
          <button
            onClick={() => handleDiamondSubscription()}
            className=" bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900"
          >
            Pay
          </button>
        ) : (
          <button
          onClick={()=>{
            toast.error("Please Cancel to Buy Another Subscription")
          }}
            className=" bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900"
          >
            Please Cancel to Buy Another Subscription
          </button>
        )
      ) : (
        <button
          onClick={() => {
            navigate("/profile")
            setSideNav(3);
            setCancelSubscriptionButton(true);
          }}
          className=" bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
