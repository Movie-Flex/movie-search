import SubscriptionDuplicate from "./SubscriptionDuplicate";

export default function SubscriptionModal({ setIsFirstTime, isFirstTime }) {
  return (
    <div className=" rounded-lg fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white dark:bg-gray-900 rounded-lg max-w-[90vw] max-h-[90vh] overflow-y-auto "
    style={{
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none', 
      },
    }}
    >
      <div className="flex text-black dark:text-white justify-end items-end m-4 ml-2 sticky top-0 z-20">
        <button onClick={() => {
          
          setIsFirstTime(false)
          localStorage.setItem('isFirstTime', false)
          
          }}>X</button>
      </div>
      <SubscriptionDuplicate />
    </div>
  </div>

  );
}
