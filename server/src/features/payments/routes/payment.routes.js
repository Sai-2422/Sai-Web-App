import express from "express";
import {
  processRefund,
  createOrderController,
  manualRefundController,
  verifyPaymentController,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/orders", createOrderController);
router.post("/verify", verifyPaymentController);
router.post("/process-refund/:orderId", processRefund);
router.post("/manual-refund/:orderId", manualRefundController);

export default router;
