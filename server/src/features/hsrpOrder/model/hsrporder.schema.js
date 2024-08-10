import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registrationNo: { 
    type: String, 
    required: true 
  },
  chassisNo: { 
    type: String, 
    required: true 
  },
  dateOfRegistration: { 
    type: String, 
    required: true 
  },
  dateOfManufacture: { 
    type: String, 
    required: true 
  },
  vehicleClass: {
    type: String,
    required: true,
    enum: ["Transport", "Non-Transport"],
    message: "Vehicle class must be one of: Transport, Non-Transport",
  },
  paymentId: { 
    type: String,
    required: true,
  },
  orderId: { 
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  refunded: {
    type: Boolean,
    default: false, 
  },
});

const HsrpOrderModel = mongoose.model("HsrpOrder", orderSchema);
export default HsrpOrderModel;
