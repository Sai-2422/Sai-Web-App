import {
  createOrder,
  verifyPayment,
  createRefund,
} from "../model/payment.repository.js";
import {
  changeRefundStatusInHsrp,
  checkIfRefundedInHsrp,
} from "../../hsrpOrder/controllers/hsrporder.controller.js";
import {
  changeRefundStatusInProduct,
  checkIfRefundedInProduct,
} from "../../productOrder/controllers/productorder.controller.js";
import { calculateRemainingAmount } from "../../../../utils/razorpayRefund/razorpayRefund.js";

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

export const processRefund = async (req, res) => {
  const { orderId } = req.params;
  const { paymentId, amount, productType } = req.body;
  const amt = calculateRemainingAmount(amount);
  try {
    const isRefunded = await checkIfRefunded(orderId, productType);
    if (isRefunded) {
      return res.status(400).json({ message: "Payment already refunded" });
    }

    const refund = await createRefund(paymentId, amt, orderId);
    await changeRefundStatus(orderId, productType);
    res.json({ success: true, refund });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process refund" });
  }
};

export const manualRefundController = async (req, res) => {
  const { orderId } = req.params;
  const { paymentId, amount, productType } = req.body;
  const amt = calculateRemainingAmount(amount);
  try {
    const isRefunded = await checkIfRefunded(orderId, productType);
    if (isRefunded) {
      return res.status(400).json({ message: "Payment already refunded" });
    }
    await changeRefundStatus(orderId, productType);
    const refund = await createRefund(paymentId, amt, orderId);
    res.json({ success: true, refund });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Common function to check if the payment is refunded based on product type
const checkIfRefunded = async (orderId, productType) => {
  if (productType === "PRODUCT") {
    return await checkIfRefundedInProduct(orderId);
  } else if (productType === "HSRP") {
    return await checkIfRefundedInHsrp(orderId);
  } else {
    throw new Error("Invalid product type");
  }
};

// Common function to change the refund status based on product type
const changeRefundStatus = async (orderId, productType) => {
  if (productType === "PRODUCT") {
    await changeRefundStatusInProduct(orderId);
  } else if (productType === "HSRP") {
    await changeRefundStatusInHsrp(orderId);
  } else {
    throw new Error("Invalid product type");
  }
};
