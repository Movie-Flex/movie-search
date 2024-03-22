
export default function RefundedAmountDetailsModal({
  RefundedAmountDetails,
  closeModal,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">Refunded Amount Details</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => closeModal(false)}
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <h1 className="text-2xl font-bold">Refund Details</h1>
          <p>Order ID: {RefundedAmountDetails.refundInfo.orderId}</p>
          <p>Receipt ID: {RefundedAmountDetails.refundInfo.receiptId}</p>
          <p>Payment ID: {RefundedAmountDetails.refundInfo.paymentId}</p>
          <p>Subscription: {RefundedAmountDetails.refundInfo.subscription}</p>
          <p>Duration: {RefundedAmountDetails.refundInfo.duration}</p>
          <p>Currency: {RefundedAmountDetails.refundInfo.currency}</p>
          <p>Net Amount: {RefundedAmountDetails.refundInfo.netAmount}</p>
          <p>Status: {RefundedAmountDetails.refundInfo.status}</p>
          <p>Payment Date: {RefundedAmountDetails.refundInfo.paymentDate}</p>
          <p>
            Payment Status: {RefundedAmountDetails.refundInfo.paymentStatus}
          </p>
          <p>Paid Amount: {RefundedAmountDetails.refundInfo.paidAmount}</p>
          <p>Refund ID: {RefundedAmountDetails.refundInfo.refundId}</p>
          <p>Refund Date: {RefundedAmountDetails.refundInfo.refundDate}</p>
          <p>Refund Status: {RefundedAmountDetails.refundInfo.refundStatus}</p>
          <p>Refund Amount: {RefundedAmountDetails.refundInfo.refundAmount}</p>
        </div>
      </div>
    </div>
  );
}
