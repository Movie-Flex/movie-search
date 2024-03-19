import { useEffect, useState } from "react";
import SubscriptionDiamond from "./SubscriptionDiamond";
import SubscriptionFree from "./SubscriptionFree";
import SubscriptionHome from "./SubscriptionHome";
import SubscriptionPremium from "./SubscriptionPremium";
import { GetAmountDetails } from "../../hooks/usegetAmountDetails";
import { tempSubscriptionData } from "../../utils/SubscriptionTempData";


export default function Subscription() {
  const [yearly, setYearly] = useState(true);

  const [amountDetails, setAmountDetails] = useState(tempSubscriptionData);

 useEffect(() => {
    GetAmountDetails().then((data) => {
      setAmountDetails(data);

    });
  },[]);
   

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
