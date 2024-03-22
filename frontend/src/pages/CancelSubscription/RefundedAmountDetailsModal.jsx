

export default function RefundedAmountDetailsModal ({ RefundedAmountDetails }) {

    return (
        <div className="flex-col text-center  justify-center items-center">
            <h1 className="text-2xl font-bold">Refund Details</h1>
            <p>Order ID: {RefundedAmountDetails.refundInfo.orderId}</p>
            <p>Receipt ID: {RefundedAmountDetails.refundInfo.receiptId}</p>
            <p>Payment ID: {RefundedAmountDetails.refundInfo.paymentId}</p>
            <p>Signature: {RefundedAmountDetails.refundInfo.signature}</p>
            <p>Email: {RefundedAmountDetails.refundInfo.email}</p>
            <p>Username: {RefundedAmountDetails.refundInfo.username}</p>
            <p>Subscription: {RefundedAmountDetails.refundInfo.subscription}</p>
            <p>Duration: {RefundedAmountDetails.refundInfo.duration}</p>
            <p>Currency: {RefundedAmountDetails.refundInfo.currency}</p>
            <p>Net Amount: {RefundedAmountDetails.refundInfo.netAmount}</p>
            <p>Status: {RefundedAmountDetails.refundInfo.status}</p>
            <p>Payment Date: {RefundedAmountDetails.refundInfo.paymentDate}</p>
            <p>Payment Status: {RefundedAmountDetails.refundInfo.paymentStatus}</p>
            <p>Paid Amount: {RefundedAmountDetails.refundInfo.paidAmount}</p>
            <p>Refund ID: {RefundedAmountDetails.refundInfo.refundId}</p>
            <p>Refund Date: {RefundedAmountDetails.refundInfo.refundDate}</p>
            <p>Refund Status: {RefundedAmountDetails.refundInfo.refundStatus}</p>
            <p>Refund Amount: {RefundedAmountDetails.refundInfo.refundAmount}</p>
        </div>
      
    );
}