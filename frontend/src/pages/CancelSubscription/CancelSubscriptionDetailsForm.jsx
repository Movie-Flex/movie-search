export default function CancelSubscriptionDetailsForm({ refundInfo }) {
  return (
    <div className="relative p-6 flex-auto">
      <div className="flex justify-between">
        <p>Subscription Date</p>
        <p>{new Date(refundInfo.subscriptionDate).toDateString()}</p>
      </div>
      <div className="flex justify-between">
        <p>Subscription Type</p>
        <p>
          {refundInfo.subscriptionType 
            // refundInfo.subscriptionType.slice(1)
          }
        </p>
      </div>
      <div className="flex justify-between">
        <p>Status</p>
        <p>
          {refundInfo.status
            // refundInfo.status.slice(1)
          }
        </p>
      </div>
      <div className="flex justify-between">
        <p>Paid Amount</p>
        <p>{refundInfo.paidAmount / 100}</p>
      </div>
      <div className="flex justify-between">
        <p>Refundable Amount</p>
        <p>{refundInfo.refundableAmount / 100}</p>
      </div>
      <div className="flex justify-between">
        <p>Charges</p>
        <p>{refundInfo.charges}</p>
      </div>
      <div className="flex justify-between">
        <p>Days Used</p>
        <p>{refundInfo.daysUsed}</p>
      </div>
    </div>
  );
}
