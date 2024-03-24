import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentVerifyModal from "./PaymentVerifyModal";
import { useLogin } from "../../hooks/useLogin";

const PaymentGateway = () => {
  // const navigate=useNavigate()

  const { TokenVerify } = useLogin();
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [paymentVerifyModalData, setPaymentVerifyModalData] = useState({});

  const { paymentGatewayReceivingData, token, isLoggedIn, setToken } =
    useContext(UserContext);
  // console.log(paymentGatewayReceivingData)

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function Checkout(event) {
    event.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const razorpayKeyId = paymentGatewayReceivingData.razorpayKeyId;
    const orderId = paymentGatewayReceivingData.paymentDetail.orderId;
    const options = {
      key: razorpayKeyId,
      currency: paymentGatewayReceivingData.paymentDetail.currency,
      name: paymentGatewayReceivingData.subscriptionDetails.name,
      description: paymentGatewayReceivingData.subscriptionDetails.description,
      image:
        "https://th.bing.com/th/id/OIP.Ph7ASU7IV-pld1YGeGu0fgHaF3?rs=1&pid=ImgDetMain",
      order_id: orderId,
      handler: async function (response) {
        const data = {
          orderCreationId: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          token: token,
        };

        const verificationObject = { ...data, ...paymentGatewayReceivingData };

        const result = await axios.post(
          "http://localhost:3002/payment/verify",

          verificationObject,

          {
            headers: {
              'authorization': `Bearer ${token}`,
            },
          });

        if (result.status === 200) {
          // alert(`Payment Successful`);
          // navigate('/paymentsuccess')
          setPaymentSuccessModal(true);
          setPaymentVerifyModalData(result.data);
          setToken(result.data.token);
          await TokenVerify(result.data.token);
          // console.log(result.data);
        }
      },
      modal: {
        ondismiss: function () {
          alert(`Payment Failed`);
        },
      },
      theme: {
        color: "#22527b",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  useEffect(() => {
    Checkout();
    const simulateButtonClick = () => {
      const button = document.querySelector('.btn.btn-primary');
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(event);
    };

    simulateButtonClick();
  }, []);

  if (!isLoggedIn) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Please Login to view Subscription Plans
          </h2>
        </div>
      </section>
    );
  }

  if (!paymentGatewayReceivingData) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Loading...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-5">
            <form id="paymentVerifyForm">
              <input
                name="razorpay_payment_id"
                type="hidden"
                id="razorpay_payment_id"
              />
              <input
                name="razorpay_order_id"
                type="hidden"
                id="razorpay_order_id"
              />
              <input
                name="razorpay_signature"
                type="hidden"
                id="razorpay_signature"
              />
            </form>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => Checkout(e)}
            >
              Continue to Pay
            </button>
          </div>
        </div>
      </div>

      {paymentSuccessModal && (
        <PaymentVerifyModal
          props={paymentVerifyModalData}
          setPaymentSuccessModal={setPaymentSuccessModal}
        />
      )}
    </>
  );
};

export default PaymentGateway;
