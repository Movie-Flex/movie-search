const ee={
    "message": "Subscription cancelled and refund processed.",
    "newToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiengiLCJlbWFpbCI6Inp4QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiengiLCJyb2xlIjoic3RhbmRhcmRfdXNlciIsInN1YnNjcmlwdGlvbiI6ImZyZWUiLCJpc3N1ZWRBdCI6MTcxMTEyMDk3ODc3OCwiaWF0IjoxNzExMTIwOTc4LCJleHAiOjE3MTExMjY5Nzh9.OuWGOiPx_8nIkFaz5G_kgcGNEpuUW2PPxsSYrO0Hs9w",
    "refundInfo": {
        "_id": "65fda19b98c45f68b3f2fc6c",
        "orderId": "order_NpRp0H8Ir31amD",
        "receiptId": "2bd79fc4-755d-4227-b66a-5adbc2d3748c",
        "paymentId": "pay_NpRqBwToIXssXe",
        "signature": "f686e7ab4b37172b2e9865f4a583337d93088402fdf4dc7720f7d7d4aa95bf3d",
        "email": "zx@gmail.com",
        "username": "zx",
        "subscription": "free",
        "duration": "feeYearly",
        "currency": "USD",
        "subunit": 100,
        "netAmount": 390,
        "status": "inactive",
        "updatedDate": "2024-03-22T15:22:58.454Z",
        "paymentDate": "2024-03-22T15:19:55.694Z",
        "paymentStatus": "paid",
        "paidAmount": 45000,
        "refundId": "rfnd_NpRtayFnrg7hcR",
        "refundDate": "2024-03-22T15:22:58.454Z",
        "refundStatus": "refunded",
        "refundAmount": 3510,
        "__v": 0
    }
}

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