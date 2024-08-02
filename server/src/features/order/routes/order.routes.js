import express from "express";
import {
  addHsrpOrder,
  getAllOrders,
  deleteOrder,
  getOrderDetails,
} from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";

const router = express.Router();
router.route("/create").post(auth, addHsrpOrder);
router.route("/getAll").get(auth, authByUserRole(["admin"]), getAllOrders);
router
  .route("/details/:orderId")
  .get(auth, authByUserRole(["admin"]), getOrderDetails);
router
  .route("/delete/:orderId")
  .delete(auth, authByUserRole(["admin"]), deleteOrder);

export default router;
