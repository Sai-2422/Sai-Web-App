import CartItemModel from "./cartItem.schema.js";
import UserModel from "../../user/models/user.schema.js";
import ProductModel from "../../products/model/product.schema.js";

export const addCartItemRepo = async ({ userId, productId, quantity }) => {
  try {
    const user = await UserModel.findById(userId).select("name");
    const product = await ProductModel.findById(productId).select("title");

    if (!user) {
      throw new Error("User not found");
    }

    if (!product) {
      throw new Error("Product not found");
    }

    let cartItem = await CartItemModel.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      const updatedCartItem = await cartItem.save();
      return { success: true, data: updatedCartItem };
    } else {
      const newCartItem = new CartItemModel({
        userId,
        productId,
        quantity,
        userName: user.name,
        productTitle: product.title,
      });

      const savedCartItem = await newCartItem.save();
      return { success: true, data: savedCartItem };
    }
  } catch (error) {
    console.error("Error in addCartItemRepo:", error);
    throw new Error(error.message || "Error adding cart item");
  }
};

export const getAllCartItemsRepo = async (userId) => {
  try {
    return await CartItemModel.find({ userId })
      .populate({
        path: 'productId',
        select: 'title minPrice productImg' 
      });
  } catch (error) {
    throw new Error(error.message || "Error fetching cart items");
  }
};

export const getCartItemCountRepo = async (userId) => {
  return await CartItemModel.countDocuments({ userId });
};

export const updateCartItemQuantityRepo = async (itemId, quantity) => {
  try {
    if (quantity <= 0) {    
      const result = await CartItemModel.findByIdAndDelete(itemId);
      if (!result) {
        throw new Error("Cart item not found.");
      }
      return { success: true, message: "Cart item deleted successfully." };
    } else {    
      const cartItem = await CartItemModel.findById(itemId);
      if (!cartItem) {
        throw new Error("Cart item not found.");
      }
      cartItem.quantity = quantity;
      const updatedCartItem = await cartItem.save();
      return { success: true, data: updatedCartItem };
    }
  } catch (error) {
    console.error("Error in updateCartItemQuantityRepo:", error);
    throw new Error(error.message || "Error updating cart item quantity");
  }
};

export const deleteCartItemRepo = async (itemId) => {
  try {
    const result = await CartItemModel.findByIdAndDelete(itemId);
    if (!result) throw new Error("Cart item not found");
    return result;
  } catch (error) {
    throw new Error(error.message || "Error deleting cart item");
  }
};

export const deleteCartItemBasedProductIdRepo = async (productId) => {
  try {
    const result = await CartItemModel.findOneAndDelete({ productId });
    if (!result) throw new Error("Cart item not found");
    return result;
  } catch (error) {
    throw new Error(error.message || "Error deleting cart item");
  }
};
