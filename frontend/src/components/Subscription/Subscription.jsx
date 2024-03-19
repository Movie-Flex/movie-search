import { useContext, useEffect, useState } from "react";
import SubscriptionHome from "./SubscriptionHome";
import SubscriptionDiamond from "./SubscriptionCards/SubscriptionDiamond";
import SubscriptionFree from "./SubscriptionCards/SubscriptionFree";
import SubscriptionPremium from "./SubscriptionCards/SubscriptionPremium";
import { GetAmountDetails } from "../../hooks/usegetAmountDetails";
import { tempSubscriptionData } from "../../utils/SubscriptionTempData";
import { UserContext } from "../../context/UserContext";


export default function Subscription() {
  const {isLoggedIn}=useContext(UserContext)
  
  const [yearly, setYearly] = useState(true);
  const [amountDetails, setAmountDetails] = useState(tempSubscriptionData);

  useEffect(() => {
    const fetchAmountDetails = async () => {
      try {
        const data = await GetAmountDetails();
        setAmountDetails(data);
      } catch (error) {
        console.error('Error fetching amount details:', error);
      }
    };
    fetchAmountDetails();
  }, []);


  if(!isLoggedIn){
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Please Login to view Subscription Plans</h2>
        </div>
      </section>
    );
  }
   

  return (
    <>
      <section className="bg-white dark:bg-gray-900">

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <SubscriptionHome yearly={yearly} setYearly={setYearly} />

          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

            <SubscriptionFree yearly={yearly} setYearly={setYearly} props={amountDetails.free}/>

            <SubscriptionPremium yearly={yearly} setYearly={setYearly} props={amountDetails.premium}/>
            
            <SubscriptionDiamond yearly={yearly} setYearly={setYearly} props={amountDetails.diamond}/>
          </div>
          
        </div>
      </section>
    </>
  );
}
