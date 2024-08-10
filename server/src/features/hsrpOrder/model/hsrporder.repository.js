import HsrpOrderModel from "./hsrporder.schema.js";

export const addHsrpOrderRepo = async (orderData) => {
  return await new HsrpOrderModel(orderData).save();
};

export const getAllOrdersRepo = async () => {
  return await HsrpOrderModel.find({}).populate({
    path: "userId",
    select: "name profileImg",
  });
};

export const getOrderDetailsRepo = async (orderId) => {
  return await HsrpOrderModel.findOne({ _id: orderId }).populate({
    path: "userId",
    select: "name contactNumber profileImg",
  });
};

export const deleteOrdersByUserId = async (userId) => {
  try {
    await HsrpOrderModel.deleteMany({ userId });
  } catch (error) {
    throw new Error(
      `Error deleting interns for user ${userId}: ${error.message}`
    );
  }
};

export const deleteOrderRepo = async (orderId) => {
  return await HsrpOrderModel.findByIdAndDelete(orderId);
};

export const changeRefundStatusInHsrpRepo = async (orderId) => {
  const updatedOrder = await HsrpOrderModel.findOneAndUpdate(
    { orderId }, 
    { refunded: true },
    { new: true } 
  );

  return updatedOrder; 
};

export const checkIfRefundedInHsrpRepo = async (orderId) => {
  const order = await HsrpOrderModel.findOne(
    { orderId }, 
    { refunded: 1 } 
  );

  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }

  return order.refunded; 
};