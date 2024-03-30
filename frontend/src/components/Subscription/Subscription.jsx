import { useContext, useEffect, useRef, useState } from "react";
import SubscriptionHome from "./SubscriptionHome";
import SubscriptionDiamond from "./SubscriptionCards/SubscriptionDiamond";
import SubscriptionFree from "./SubscriptionCards/SubscriptionFree";
import SubscriptionPremium from "./SubscriptionCards/SubscriptionPremium";
import { GetAmountDetails } from "../../hooks/usegetAmountDetails";
import { tempSubscriptionData } from "../../utils/SubscriptionTempData";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function Subscription() {
  const { isLoggedIn, user } = useContext(UserContext);
  const navigate = useNavigate();

  var subscriptionfree = user.subscription === "free" ? true : false;

  const [yearly, setYearly] = useState("true");
  const [amountDetails, setAmountDetails] = useState(tempSubscriptionData);

  const { getAmountDetails } = GetAmountDetails();

  useEffect(() => {
    const fetchAmountDetails = async () => {
      try {
        const data = await getAmountDetails();
        setAmountDetails(data);
        // console.log("Amount Details", data);
      } catch (error) {
        console.error("Error fetching amount details:", error);
      }
    };
    fetchAmountDetails();
  }, []);

  if (!isLoggedIn) {
    return (
      <section className="bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <h2 className="text-3xl font-semibold text-gray-100">
            Please Login to view Subscription Plans
          </h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-900 max-w-full mx-auto">
       
        <div className="flex items-center justify-between py-4 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-200 hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="flex  items-center justify-between bg-gray-900 py-4 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-200 hover:text-gray-100"
          >
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
            <span>Home</span>
          </button>
        </div>
        

        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:pt-8 lg:px-6">
          <SubscriptionHome yearly={yearly} setYearly={setYearly} />

          <div className="flex justify-center items-center sm:gap-6 xl:gap-10 lg:space-y-0">
            {subscriptionfree && (
              <SubscriptionFree
                yearly={yearly}
                setYearly={setYearly}
                props={amountDetails.free}
              />
            )}

            <SubscriptionPremium
              yearly={yearly}
              setYearly={setYearly}
              props={amountDetails.premium}
            />

            <SubscriptionDiamond
              yearly={yearly}
              setYearly={setYearly}
              props={amountDetails.diamond}
            />
          </div>
        </div>
      </section>
    </>
  );
}
