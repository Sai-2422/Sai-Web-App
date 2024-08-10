import { ApplicationError } from "../../../../utils/errorHandler.js";
import {
  getOrdersCountRepo,
  addProductOrderRepo,
  cancelOrderStatusRepo,
  deleteProductOrderRepo,
  getAllProductOrdersRepo,
  checkIfRefundedInProductRepo,
  updateProductOrderStatusRepo,
  changeRefundStatusInProductRepo,
  getAllProductOrdersForAdminRepo,
} from "../model/productorder.repository.js";
import { deleteCartItemBasedProductIdRepo } from "../../cartItems/model/cartItem.repository.js";

export const addProductOrder = async (req, res, next) => {
  const { order_id: orderId, payment_id: paymentId, ...requestData } = req.body;
  const { productId } = req.body;

  const deletedOrder = await deleteCartItemBasedProductIdRepo(productId);

  if (!deletedOrder) {
    return next(new ApplicationError(404, "Order not found."));
  }

  if (!orderId || !paymentId || !requestData) {
    return next(new ApplicationError(400, "Invalid input data."));
  }

  try {
    const customerData = await addProductOrderRepo({
      ...requestData,
      orderId,
      paymentId,
    });
    res.status(201).json({ success: true, customerData });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const getAllProductOrdersForAdmin = async (req, res, next) => {
  try {
    const allOrdersForAdmin = await getAllProductOrdersForAdminRepo();
    res.status(200).json({ success: true, allOrdersForAdmin });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const getAllProductOrders = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const allOrders = await getAllProductOrdersRepo(userId);
    res.status(200).json({ success: true, allOrders });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const fetchOrdersCount = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const count = await getOrdersCountRepo(userId);
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const updateProductOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!orderId || !status) {
    return next(new ApplicationError(400, "Order ID and status are required."));
  }

  try {
    const updatedOrder = await updateProductOrderStatusRepo(orderId, status);

    if (!updatedOrder) {
      return next(new ApplicationError(404, "Order not found."));
    }

    res.status(200).json({ success: true, updatedOrder });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const cancelOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;

  if (!orderId) {
    return next(new ApplicationError(400, "Order ID is required."));
  }

  try {
    const cancelledOrder = await cancelOrderStatusRepo(orderId);

    res.status(200).json({ success: true, cancelledOrder });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const deleteProductOrder = async (req, res, next) => {
  const { orderId } = req.params;

  if (!orderId) {
    return next(new ApplicationError(400, "Order ID is required."));
  }

  try {
    const deletedOrder = await deleteProductOrderRepo(orderId);
    if (!deletedOrder) {
      return next(new ApplicationError(404, "Order not found."));
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const changeRefundStatusInProduct = async (orderId) => {
  try {
    const updatedOrder = await changeRefundStatusInProductRepo(orderId);
    if (!updatedOrder) {
      throw new ApplicationError(404, `Order with id ${orderId} not found`);
    }
    return updatedOrder;
  } catch (error) {
    console.error(
      `Failed to update refund status for order ${orderId}:`,
      error
    );
    throw new ApplicationError(500, "Failed to update refund status");
  }
};

export const checkIfRefundedInProduct = async (orderId) => {
  try {
    const isRefunded = await checkIfRefundedInProductRepo(orderId);
    return isRefunded;
  } catch (error) {
    console.error(`Failed to check refund status for order ${orderId}:`, error);
    throw new ApplicationError(500, "Failed to check refund status");
  }
};
