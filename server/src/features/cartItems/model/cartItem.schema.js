import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userName: { type: String },
  productTitle: { type: String },
  quantity: { type: Number, required: true },
});

const CartItemModel = mongoose.model("CartItem", cartItemSchema);

export default CartItemModel;
