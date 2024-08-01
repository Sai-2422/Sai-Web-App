import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (productData) => {
  return await new ProductModel(productData).save();
};

export const getAllProductsRepo = async () => {
  return await ProductModel.find(
    {},
    {
      title: 1,
      maxPrice: 1,
      minPrice: 1,
      productImg: 1,
    }
  );
};

export const getProductDetailsRepo = async (productId, projection) => {
  return await ProductModel.findById(productId, projection);
};

export const updateProductRepo = async (productId, updateData) => {
  return await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProductRepo = async (productId) => {
  return await ProductModel.findByIdAndDelete(productId);
};
