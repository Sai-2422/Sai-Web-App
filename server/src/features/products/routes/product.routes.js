import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";
import upload from "../../../../middlewares/fileupload.middleware.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/details/:productId").get(getProductDetails);

router
  .route("/add")
  .post(
    auth,
    authByUserRole(["admin"]),
    upload.single("productImg"),
    addNewProduct
  );

router
  .route("/update/:productId")
  .put(
    auth,
    authByUserRole(["admin"]),
    upload.single("productImg"),
    updateProduct
  );

router
  .route("/delete/:productId")
  .delete(auth, authByUserRole(["admin"]), deleteProduct);

export default router;
