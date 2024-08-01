import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/order`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  orders: [],
};

// Thunk to fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
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

// Thunk to fetch order details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
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

// Thunk to post a new order
export const postHsrpRequest = createAsyncThunk(
  "orders/postHsrpRequest",
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

// Thunk to delete a order
export const deleteHsrpRequest = createAsyncThunk(
  "orders/deleteHsrpRequest",
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
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = action.payload.allOrders;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch HSRP orders.";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orderDetails = action.payload.orderDetails;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch order details.";
      })
      .addCase(postHsrpRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(postHsrpRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "New HSRP order posted successfully.";
      })
      .addCase(postHsrpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to post new HSRP order.";
      })
      .addCase(deleteHsrpRequest.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteHsrpRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "HSRP order deleted successfully.";
      })
      .addCase(deleteHsrpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete HSRP oredr.";
      });
  },
});

export default ordersSlice.reducer;

export const getLoadingState = (state) => state.order.loading;
export const getError = (state) => state.order.error;
export const getErrorMessage = (state) => state.order.message;
export const getAllOrders = (state) => state.order.orders;
export const getOrder = (state) => state.order.orderDetails;
