import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registrationNo: { type: String, required: true },
  chassisNo: { type: String, required: true },
  dateOfRegistration: { type: String, required: true },
  dateOfManufacture: { type: String, required: true },
  vehicleClass: {
    type: String,
    required: true,
    enum: ["Transport", "Non-Transport"],
    message:
      "Vehicle class must be one of: Transport, Non-Transport",
  },
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
