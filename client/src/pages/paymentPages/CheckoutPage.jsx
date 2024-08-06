import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "../../redux/reducers/paymentReducer";
import { toast } from "react-toastify";
import Loader from "../../UI/Loader";

const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.payment.loading);
  const error = useSelector((state) => state.payment.error);
  const message = useSelector((state) => state.payment.message);

  const handlePay = () => {
    dispatch(initiatePayment(amount))
      .unwrap()
      .then(() => {
        toast.success("Payment initiated successfully!");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to initiate payment.");
      });
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePay} disabled={loading}>
        {loading ? <Loader /> : "Pay Now"}
      </button>
      {error && <p>Error: {message}</p>}
    </div>
  );
};

export default Checkout;
