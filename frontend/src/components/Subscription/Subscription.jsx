import SubscriptionDiamond from "./SubscriptionDiamond";
import SubscriptionFree from "./SubscriptionFree";
import SubscriptionHome from "./SubscriptionHome";
import SubscriptionPremium from "./SubscriptionPremium";

export default function Subscription() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <section class="bg-white dark:bg-gray-900">

      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <SubscriptionHome yearly={yearly} setYearly={setYearly} />

          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <SubscriptionFree/>

            <SubscriptionPremium/>
            
            <SubscriptionDiamond/>
          </div>
          
        </div>
      </section>
    </>
  );
}
