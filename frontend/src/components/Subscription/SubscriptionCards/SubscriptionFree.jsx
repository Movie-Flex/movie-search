import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionFree({ props, yearly, setYearly }) {
  const { features, currency, subunit, feeYearly, feeMonthly } = props;
  const navigate = useNavigate();

  const handleFreeSubscription = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border 
    shadow border-gray-600 xl:p-8 bg-gray-800 text-white"
    >
      <h3 className="mb-4 text-2xl font-semibold">Free</h3>
      <p className="font-light sm:text-lg text-gray-400">
        Includes Limited Features and Access
      </p>
      {/* {yearly?"true":"false"} */}

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
              className="flex-shrink-0 w-5 h-5  text-green-400"
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

      <button
        onClick={() => handleFreeSubscription()}
        className=" bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900"
      >
        Try Free
      </button>
    </div>
  );
}
