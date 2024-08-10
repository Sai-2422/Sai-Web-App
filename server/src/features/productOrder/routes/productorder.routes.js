import express from "express";
import {
  addProductOrder,
  fetchOrdersCount,
  cancelOrderStatus,
  deleteProductOrder,
  getAllProductOrders,
  updateProductOrderStatus,
  getAllProductOrdersForAdmin,
} from "../controllers/productorder.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(auth, addProductOrder);
router.route("/getAll").get(auth, getAllProductOrders);
router
  .route("/getAllForAdmin")
  .get(auth, authByUserRole(["admin"]), getAllProductOrdersForAdmin);
router.route("/orders/count").get(auth, fetchOrdersCount);
router
  .route("/update/status/:orderId")
  .put(auth, authByUserRole(["admin"]), updateProductOrderStatus);
router.route("/orders/cancel/:orderId").patch(auth, cancelOrderStatus);
router.route("/delete/:orderId").delete(auth, deleteProductOrder);

export default router;
