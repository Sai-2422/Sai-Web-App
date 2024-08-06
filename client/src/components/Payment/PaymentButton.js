import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  initiatePayment,
  verifyPayment,
} from "../../redux/reducers/paymentReducer";
import { getUser } from "../../redux/reducers/authReducer";

const PaymentButton = ({ amount, description }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const loadRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    dispatch(initiatePayment(amount))
      .unwrap()
      .then((result) => {
        const { amount: orderAmount, id: order_id, currency } = result;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: orderAmount.toString(),
          currency,
          name: "Shivshakti Agro Industries",
          description: description || "Transaction",
          order_id,
          handler: (response) => {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            dispatch(verifyPayment(data))
              .unwrap()
              .then(() => {
                toast.success("Payment successful!");
              })
              .catch((err) => {
                toast.error(err.message || "Payment failed!");
              });
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.contactNumber,
          },
          notes: {
            userAddress: user.address || "User Address",
            userGender: user.gender || "User Gender",
          },
          theme: {
            color: "#61dafb",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((err) => {
        toast.error(err.message || "Server error. Please try again.");
      });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <button onClick={loadRazorpay} className="btn btn-primary">
      Pay with Razorpay
    </button>
  );
};

export default PaymentButton;
