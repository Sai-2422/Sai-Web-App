import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getAllCartItems,
  getCartItemCount,
  updateCartItemQuantity,
} from "../controllers/cartItem.controller.js";
import { auth } from "../../../../middlewares/auth.js";

const router = express.Router();

router.route("/items/add").post(auth, addCartItem);
router.route("/items/getAll").get(auth, getAllCartItems);
router.route("/items/count").get(auth, getCartItemCount);
router.route("/items/delete/:itemId").delete(deleteCartItem);
router.route("/items/updateQuantity/:itemId").put(updateCartItemQuantity);

export default router;
