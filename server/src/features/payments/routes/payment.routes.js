import express from "express";
import {
  createOrderController,
  verifyPaymentController,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/orders", createOrderController);
router.post("/verify", verifyPaymentController);

export default router;
