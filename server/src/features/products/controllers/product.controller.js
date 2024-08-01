import { ApplicationError } from "../../../../utils/errorHandler.js";
import {
  addNewProductRepo,
  deleteProductRepo,
  getAllProductsRepo,
  getProductDetailsRepo,
  updateProductRepo,
} from "../model/product.repository.js";

export const addNewProduct = async (req, res, next) => {
  const updateData = { ...req.body };
  const productImg = req.file;
  try {
    if (!productImg) {
      return next(new ApplicationError(400, "Product image is required."));
    } else {
      const base64Image = imageData.toString("base64");
      updateData.productImg = `data:${productImg.mimetype};base64,${base64Image}`;
    }

    const product = await addNewProductRepo(updateData);

    res.status(201).json({ success: true, product });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsRepo();
    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No products found" });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ApplicationError(500, "Internal server error"));
  }
};

export const getProductDetails = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await getProductDetailsRepo(productId);
    if (!product) {
      return next(new ApplicationError(400, "Product not found!"));
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const updateProduct = async (req, res, next) => {
  const updateData = { ...req.body };
  const productImg = req.file;
  const productId = req.params.productId;
  try {
    if (updateData.removeImage) {
      updateData.productImg = null;
    }
    if (productImg) {
      const base64Image = imageData.toString("base64");
      updateData.productImg = `data:${productImg.mimetype};base64,${base64Image}`;
    }
    const updatedProduct = await updateProductRepo(productId, updateData);
    if (updatedProduct) {
      res.status(200).json({ success: true, updatedProduct });
    } else {
      return next(new ApplicationError(404, "Product not found!"));
    }
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await deleteProductRepo(productId);
    if (deletedProduct) {
      res.status(200).json({ success: true, deletedProduct });
    } else {
      return next(new ApplicationError(400, "Product not found!"));
    }
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};
