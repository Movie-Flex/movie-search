export default function SubscriptionYearButton({ yearly, setYearly }) {
  return (
    <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
      <div className="relative flex w-full p-1  bg-slate-900 rounded-full">
        <span
          className="absolute inset-0 m-1 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 
            transform transition-transform duration-150 ease-in-out ${
              yearly ? "translate-x-0" : "translate-x-full"
            }`}
          ></span>
        </span>
        <button
          className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring
            focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
              yearly ? "text-white" : " text-slate-400"
            }`}
          onClick={() => setYearly(true)}
        >
          Yearly{" "}
          {/* <span
            className={`${
              yearly ? "text-indigo-200" : "text-slate-400 text-slate-500"
            }`}
          >
            -20%
          </span> */}
        </button>
        <button
          className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring
           f focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
             yearly ? " text-slate-400" : "text-white"
           }`}
          onClick={() => setYearly(false)}
        >
          Monthly
        </button>
      </div>
    </div>
  );
}
