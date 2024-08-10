import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("config", "uat.env") });

import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

export const createOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: uuidv4(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error(error.message || JSON.stringify(error));
  }
};

export const verifyPayment = (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === razorpaySignature;
};

// Create a refund with Razorpay
export const createRefund = async (paymentId, amount, orderId) => {
  return await razorpay.payments.refund(paymentId, {
    amount,
    notes: {
      order_id: orderId,
    },
  });
};
