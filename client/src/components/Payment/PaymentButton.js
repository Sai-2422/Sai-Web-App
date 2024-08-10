import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  initiatePayment,
  verifyPayment,
  requestRefund,
} from "../../redux/reducers/paymentReducer";
import { postHsrpOrderRequest } from "../../redux/reducers/hsrporderReducer";
import { postProductOrderRequest } from "../../redux/reducers/productorderReducer";
import { getUser } from "../../redux/reducers/authReducer";

const PaymentButton = ({ amount, description, payfor, formData }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  // Function to handle order creation and send both order_id and paymentId
  const handleOrderCreation = async (order_id, payment_id, amount) => {
    if (payfor === "HSRP") {
      try {
        // Update formData to include amount, order_id, and paymentId
        const updatedFormData = { ...formData, amount, order_id, payment_id };
        await dispatch(postHsrpOrderRequest(updatedFormData)).unwrap();
        toast.success("Order created successfully.");
        return true;
      } catch (error) {
        toast.error(error.message || "Failed to post order data.");
        return false;
      }
    } else if (payfor === "PRODUCT") {
      try {
        const updatedFormData = { ...formData, amount, order_id, payment_id };
        await dispatch(postProductOrderRequest(updatedFormData)).unwrap();
        toast.success("Order created successfully.");
        return true;
      } catch (error) {
        toast.error(error.message || "Failed to create product order.");
        return false;
      }
    }
    return true;
  };

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
          handler: async (response) => {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            try {
              await dispatch(verifyPayment(data)).unwrap();
              toast.success("Payment successful!");

              // Pass both order_id and paymentId to handleOrderCreation
              const isOrderCreated = await handleOrderCreation(
                order_id,
                response.razorpay_payment_id,
                amount
              );
              if (!isOrderCreated) {
                toast.error("Order creation failed. Requesting refund.");
                if (payfor === "HSRP") {
                  await dispatch(
                    requestRefund({
                      orderId: order_id,
                      paymentId: response.razorpay_payment_id,
                      amount: orderAmount,
                      productType: "HSRP",
                    })
                  ).unwrap();
                } else if (payfor === "PRODUCT") {
                  await dispatch(
                    requestRefund({
                      orderId: order_id,
                      paymentId: response.razorpay_payment_id,
                      amount: orderAmount,
                      productType: "PRODUCT",
                    })
                  ).unwrap();
                }
              }
            } catch (err) {
              toast.error(err.message || "Payment verification failed!");
            }
          },
          prefill: {
            name: user.name || "Guest",
            email: user.email || "guest@example.com",
            contact: user.contactNumber || "0000000000",
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
