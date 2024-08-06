import { createOrder, verifyPayment } from "../model/payment.repository.js";

export const createOrderController = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await createOrder(amount);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyPaymentController = (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const isAuthentic = verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  );

  if (isAuthentic) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};
