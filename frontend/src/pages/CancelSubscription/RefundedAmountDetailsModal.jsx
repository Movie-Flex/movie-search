import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function RefundedAmountDetailsModal({
  RefundedAmountDetails,
  closeModal,
}) {

  const { setSideNav } = useContext(UserContext);
  return (
    //make the smae with nice css
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Refunded Amount Details
                </h3>
                <div class="mt-2">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">
                        Order ID:
                      </label>
                      <p class="mt-1 text-sm text-gray-900">
                        {RefundedAmountDetails.refundInfo.orderId}
                      </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Receipt ID:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.receiptId}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Payment ID:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.paymentId}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Net Amount:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.netAmount}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Payment Date:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.paymentDate}
                    </p>
                    </div>
                    <div>

                    <label class="block text-sm font-medium text-gray-700">
                      Refund ID:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.refundId}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Refund Date:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.refundDate}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Refund Status:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.refundStatus}
                    </p>
                    </div>
                    <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Refund Amount:
                    </label>
                    <p class="mt-1 text-sm text-gray-900">
                      {RefundedAmountDetails.refundInfo.refundAmount/100}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                closeModal(false);
                window.location.reload()
                setSideNav(1)
              }}
            >
              Close
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

