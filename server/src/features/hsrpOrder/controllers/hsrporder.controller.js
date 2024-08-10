import { ApplicationError } from "../../../../utils/errorHandler.js";
import {
  addHsrpOrderRepo,
  deleteOrderRepo,
  getAllOrdersRepo,
  getOrderDetailsRepo,
  checkIfRefundedInHsrpRepo,
  changeRefundStatusInHsrpRepo,
} from "../model/hsrporder.repository.js";

export const addHsrpOrder = async (req, res, next) => {
  const { order_id: orderId, payment_id: paymentId, ...requestData } = req.body;
  // Check if both orderId and paymentId are provided
  if (!orderId || !paymentId || !requestData) {
    return next(new ApplicationError(400, "Invalid input data."));
  }
  try {
    const customerData = await addHsrpOrderRepo({
      ...requestData,
      orderId,
      paymentId, // Include paymentId in the data
    });
    res.status(201).json({ success: true, customerData });
  } catch (error) {
    console.error(error);
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersRepo();
    res.status(200).json({ success: true, allOrders });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const getOrderDetails = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const orderDetails = await getOrderDetailsRepo(orderId);
    if (!orderDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return next(new ApplicationError(500, error.message));
  }
};

export const deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, error: "Order ID is required" });
    }
    const result = await deleteOrderRepo(orderId);
    if (!result) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const changeRefundStatusInHsrp = async (orderId) => {
  try {
    const updatedOrder = await changeRefundStatusInHsrpRepo(orderId);
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

export const checkIfRefundedInHsrp = async (orderId) => {
  try {
    const isRefunded = await checkIfRefundedInHsrpRepo(orderId);
    return isRefunded;
  } catch (error) {
    console.error(`Failed to check refund status for order ${orderId}:`, error);
    throw new ApplicationError(500, "Failed to check refund status");
  }
};
