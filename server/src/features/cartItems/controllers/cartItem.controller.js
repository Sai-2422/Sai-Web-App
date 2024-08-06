import { ApplicationError } from "../../../../utils/errorHandler.js";
import {
  addCartItemRepo,
  deleteCartItemRepo,
  getAllCartItemsRepo,
  getCartItemCountRepo,
  updateCartItemQuantityRepo,
} from "../model/cartItem.repository.js";

export const addCartItem = async (req, res, next) => {
  const itemData = req.body;
  try {
    const newCartItem = await addCartItemRepo(itemData);
    res.status(201).json({ success: true, data: newCartItem });
  } catch (error) {
    next(new ApplicationError(500, error.message || "Internal Server Error"));
  }
};

export const getAllCartItems = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const items = await getAllCartItemsRepo(userId);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const getCartItemCount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const count = await getCartItemCountRepo(userId);
    res.status(200).json({ success: true, count });
  } catch (error) {
    next(new ApplicationError(500, error.message || "Internal Server Error"));
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    const result = await updateCartItemQuantityRepo(itemId, quantity);
    res.status(200).json(result);
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const deleteCartItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await deleteCartItemRepo(itemId);
    res.status(200).json({ success: true, data: deletedItem });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};
