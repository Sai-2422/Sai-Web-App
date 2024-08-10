import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  quantity: {
    type: Number,
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add expectedDeliveryDate as a virtual field
orderSchema.virtual('expectedDeliveryDate').get(function() {
  const createdAt = this.createdAt || new Date();
  const expectedDeliveryDate = new Date(createdAt);
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 15);
  return expectedDeliveryDate;
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ProductOrderModel = mongoose.model("ProductOrder", orderSchema);
export default ProductOrderModel;
