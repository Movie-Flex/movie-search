

export default function RefundedAmountDetailsModal ({ refundInfo }) {
    return (
        <div className="flex-col text-center  justify-center items-center">
            <h1 className="text-2xl font-bold">Refund Details</h1>
            <p>Order ID: {refundInfo.orderId}</p>
            <p>Receipt ID: {refundInfo.receiptId}</p>
            <p>Payment ID: {refundInfo.paymentId}</p>
            <p>Signature: {refundInfo.signature}</p>
            <p>Email: {refundInfo.email}</p>
            <p>Username: {refundInfo.username}</p>
            <p>Subscription: {refundInfo.subscription}</p>
            <p>Duration: {refundInfo.duration}</p>
            <p>Currency: {refundInfo.currency}</p>
            <p>Net Amount: {refundInfo.netAmount}</p>
            <p>Status: {refundInfo.status}</p>
            <p>Payment Date: {refundInfo.paymentDate}</p>
            <p>Payment Status: {refundInfo.paymentStatus}</p>
            <p>Paid Amount: {refundInfo.paidAmount}</p>
            <p>Refund ID: {refundInfo.refundId}</p>
            <p>Refund Date: {refundInfo.refundDate}</p>
            <p>Refund Status: {refundInfo.refundStatus}</p>
            <p>Refund Amount: {refundInfo.refundAmount}</p>
        </div>
      
    );
}