import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/hsrp-order`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  orders: [],
  orderDetails: null,
};

// Thunk to fetch all HSRP orders
export const fetchAllHSRPOrders = createAsyncThunk(
  "orders/fetchAllHSRPOrders",
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

// Thunk to fetch HSRP order details
export const fetchHSRPOrderDetails = createAsyncThunk(
  "orders/fetchHSRPOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/details/${orderId}`, {
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

// Thunk to post a new HSRP order
export const postHsrpOrderRequest = createAsyncThunk(
  "orders/postHsrpOrderRequest",
  async (orderData, { rejectWithValue }) => {
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

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a HSRP order
export const deleteHsrpOrderRequest = createAsyncThunk(
  "orders/deleteHsrpOrderRequest",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "hsrpOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHSRPOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllHSRPOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = action.payload.allOrders; // Adjust according to response structure
      })
      .addCase(fetchAllHSRPOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch HSRP orders.";
      })
      .addCase(fetchHSRPOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchHSRPOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orderDetails = action.payload.orderDetails; // Adjust according to response structure
      })
      .addCase(fetchHSRPOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch HSRP order details.";
      })
      .addCase(postHsrpOrderRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(postHsrpOrderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "New HSRP order posted successfully.";
      })
      .addCase(postHsrpOrderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to post new HSRP order.";
      })
      .addCase(deleteHsrpOrderRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteHsrpOrderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "HSRP order deleted successfully.";
      })
      .addCase(deleteHsrpOrderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete HSRP order.";
      });
  },
});

export default ordersSlice.reducer;

export const getLoadingState = (state) => state.hsrpOrders.loading;
export const getError = (state) => state.hsrpOrders.error;
export const getErrorMessage = (state) => state.hsrpOrders.message;
export const getAllHSRPOrders = (state) => state.hsrpOrders.orders;
export const getHSRPOrder = (state) => state.hsrpOrders.orderDetails;
