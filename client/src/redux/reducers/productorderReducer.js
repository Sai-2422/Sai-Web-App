import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchCartItemsCount} from "./cartItemReducer"

const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/product-order`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  orders: [],
  orderDetails: null,
  orderCount: 0, // Add orderCount to the initial state
};

// Thunk to fetch all product orders for admin
export const fetchAllOrdersForAdmin = createAsyncThunk(
  "orders/fetchAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getAllForAdmin`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all product orders
export const fetchAllProductOrders = createAsyncThunk(
  "orders/fetchAllProductOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getAll`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetch order count
export const fetchOrdersCount = createAsyncThunk(
  "orders/fetchOrdersCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/count`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to post a new product order
export const postProductOrderRequest = createAsyncThunk(
  "orders/postProductOrderRequest",
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      dispatch(fetchOrdersCount());
      dispatch(fetchCartItemsCount());
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update product order status
export const updateProductOrderStatus = createAsyncThunk(
  "orders/updateProductOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to cancel an order
export const cancelOrderStatus = createAsyncThunk(
  "orders/cancelOrderStatus",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/cancel/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a product order
export const deleteProductOrderRequest = createAsyncThunk(
  "orders/deleteProductOrderRequest",
  async (orderId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      dispatch(fetchOrdersCount());
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "productOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersForAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllOrdersForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = action.payload.allOrdersForAdmin;
      })
      .addCase(fetchAllOrdersForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.payload || "Failed to fetch all orders for admin.";
      })
      .addCase(fetchAllProductOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllProductOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = action.payload.allOrders; // Adjust according to response structure
      })
      .addCase(fetchAllProductOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch product orders.";
      })
      .addCase(postProductOrderRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(postProductOrderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "New product order posted successfully.";
      })
      .addCase(postProductOrderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to post new product order.";
      })
      .addCase(deleteProductOrderRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteProductOrderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        ); // Remove deleted order from state
        state.message = "Product order deleted successfully.";
      })
      .addCase(deleteProductOrderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete product order.";
      })
      .addCase(fetchOrdersCount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchOrdersCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orderCount = action.payload.count; // Adjust according to response structure
        console.log("state.orderCount", state.orderCount);
      })
      .addCase(fetchOrdersCount.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch order count.";
      })
      .addCase(updateProductOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateProductOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ); // Update order status in state
        state.message = "Product order status updated successfully.";
      })
      .addCase(updateProductOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.payload || "Failed to update product order status.";
      })
      .addCase(cancelOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(cancelOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ); // Update the cancelled order in state
        state.message = "Product order cancelled successfully.";
      })
      .addCase(cancelOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to cancel product order.";
      });
  },
});

export default ordersSlice.reducer;

export const getLoadingState = (state) => state.productOrders.loading;
export const getError = (state) => state.productOrders.error;
export const getOrderCount = (state) => state.productOrders.orderCount;
export const getErrorMessage = (state) => state.productOrders.message;
export const getAllProductOrders = (state) => state.productOrders.orders;
export const getProductOrder = (state) => state.productOrders.orderDetails;
