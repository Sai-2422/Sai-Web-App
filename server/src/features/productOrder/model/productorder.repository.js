import ProductOrderModel from "./productorder.schema.js";

export const addProductOrderRepo = async (orderData) => {
return await new ProductOrderModel(orderData).save();
};

export const getAllProductOrdersForAdminRepo = async () => {
  const allOrders = await ProductOrderModel.find()
    .populate({
      path: "productId",
      select: "productImg title",
    })
    .populate({
      path: "userId",
      select: "name email contactNumber gender address profileImg",
    });
  return allOrders;
};

export const getAllProductOrdersRepo = async (userId) => {
  return await ProductOrderModel.find({ userId }).populate({
    path: "productId",
    select: "productImg title",
  });
};

export const getOrdersCountRepo = async (userId) => {
  return await ProductOrderModel.countDocuments({ userId });
};

export const updateProductOrderStatusRepo = async (orderId, status) => {
  const validStatuses = ["pending", "shipped", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    throw new ApplicationError(400, "Invalid status value.");
  }

  return await ProductOrderModel.findByIdAndUpdate(
    orderId,
    { status, updatedAt: Date.now() },
    { new: true }
  );
};

export const cancelOrderStatusRepo = async (orderId) => {
  const status = "cancelled";

  const order = await ProductOrderModel.findByIdAndUpdate(
    orderId,
    { status, updatedAt: Date.now() },
    { new: true }
  );

  if (!order) {
    throw new ApplicationError(404, "Order not found.");
  }

  return order;
};

export const deleteProductOrderRepo = async (orderId) => {
  return await ProductOrderModel.findByIdAndDelete(orderId);
};

export const changeRefundStatusInProductRepo = async (orderId) => {
  const updatedOrder = await ProductOrderModel.findOneAndUpdate(
    { orderId },
    { refunded: true },
    { new: true }
  );

  return updatedOrder;
};

export const checkIfRefundedInProductRepo = async (orderId) => {
  const order = await ProductOrderModel.findOne({ orderId }, { refunded: 1 });

  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }

  return order.refunded;
};
