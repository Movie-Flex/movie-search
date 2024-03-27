import SubscriptionYearButton from "./SubscriptionYearButton";

export default function SubscriptionHome({ yearly, setYearly }) {
  return (
    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
        Payment Page
      </h2>
      <p className="mb-5 font-light  sm:text-xl text-gray-400">
        Welcome to MovieFlex Payment
      </p>
      <SubscriptionYearButton yearly={yearly} setYearly={setYearly} />
    </div>
  );
}
