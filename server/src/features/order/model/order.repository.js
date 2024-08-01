import OrderModel from "./order.schema.js";

export const addHsrpOrderRepo = async (internData) => {
  return await new OrderModel(internData).save();
};

export const getAllOrdersRepo = async () => {
  return await OrderModel.find({}).populate({
    path: "userId",
    select: "name profileImg",
  });
};

export const getOrderDetailsRepo = async (orderId) => {
  return await OrderModel.findOne({ _id:orderId }).populate({
    path: "userId",
    select: "name contactNumber profileImg",
  });
};

export const deleteOrderRepo = async (orderId) => {
  return await OrderModel.findByIdAndDelete(orderId);
};
