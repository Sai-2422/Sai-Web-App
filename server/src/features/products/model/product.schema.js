import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minLength: [
      10,
      "Product description should be at least 10 characters long",
    ],
  },
  minPrice: {
    type: Number,
    required: [true, "Minimum product price is required"],
  },
  maxPrice: {
    type: Number,
    required: [true, "Maximum product price is required"],
  },
  pricePerKg: {
    type: Number,
    required: [true, "Product price per kg is required"],
  },
  productImg: {
    type: String,
    required: [true, "Product image URL is required"],
  },
});



const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
