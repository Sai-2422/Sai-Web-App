import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/product`;

// Initial state
const initialState = {
  products: [],
  product: null,
  error: false,
  message: "",
  loading: false,
};

// Async thunk for fetch all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
);

// Async thunk for fetch product details
export const fetchProductDetails = createAsyncThunk(
  "product/fetchDetails",
  async (productId) => {
    const response = await fetch(`${API_BASE_URL}/details/${productId}`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
);

// Async thunk for add new product
export const addNewProduct = createAsyncThunk(
  "product/add",
  async (productData) => {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      credentials: "include",
      body: productData,
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
);

// Async thunk for update product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ productId, productData }) => {
    const response = await fetch(`${API_BASE_URL}/update/${productId}`, {
      method: "PUT",
      credentials: "include",
      body: productData,
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
);

// Async thunk for delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId) => {
    const response = await fetch(`${API_BASE_URL}/delete/${productId}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.message = "Products fetched successfully.";
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to fetch products.";
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.message = "Product details fetched successfully.";
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || "Failed to fetch product details.";
      })
      // Add new product
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
        state.message = "Product added successfully.";
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to add new product.";
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProductId = action.meta.arg;
        const index = state.products.findIndex(
          (product) => product._id === updatedProductId
        );
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload.product,
          };
        }
        state.message = "Product updated successfully.";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to update product.";
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming productId is passed as the action payload
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg // Use the `meta.arg` to get the original productId
        );
        state.message = "Product deleted successfully.";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message || "Failed to delete product.";
      });
  },
});

export default productSlice.reducer;
