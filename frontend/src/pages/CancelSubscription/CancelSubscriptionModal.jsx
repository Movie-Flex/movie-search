import React, { useState } from "react";
import { useCancelSubscription } from "../../hooks/useCancelSubscription";
import CancelSubscriptionDetailsForm from "./CancelSubscriptionDetailsForm";
import RefundedAmountDetailsModal from "./RefundedAmountDetailsModal";

export default function CancelSubscriptionModal({ closeModal, refundInfo }) {
  const { cancelSubscription } = useCancelSubscription();
  console.log("Refund Info", refundInfo);

  const [RefundedAmountDetails, setRefundedAmountDetails] = useState({});

  const cancel = async () => {
    try {
      const response= await cancelSubscription();
      setRefundedAmountDetails(response);
    } catch (error) {
      console.log("Error", error);
    }
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">Cancel Subscription</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => closeModal(false)}
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              Are you sure you want to cancel your subscription?
            </p>
          </div>
          <CancelSubscriptionDetailsForm refundInfo={refundInfo} />

          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => closeModal(false)}
            >
              No
            </button>

            <button
              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={cancel}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      {/* {RefundedAmountDetails && <RefundedAmountDetailsModal refundInfo={RefundedAmountDetails.refundInfo} />} */}
    </div>
  );
}
