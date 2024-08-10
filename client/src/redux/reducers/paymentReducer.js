import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/payment`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  paymentStatus: null,
};

// Thunk to initiate payment
export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to verify payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to request a refund using fetch
export const requestRefund = createAsyncThunk(
  "refund/requestRefund",
  async ({ orderId, paymentId, amount, productType }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/process-refund/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId, amount, productType }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Thunk to manually request a refund by admin
export const manualRefund = createAsyncThunk(
  "refund/manualRefund",
  async ({ orderId, paymentId, amount, productType }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/manual-refund/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, amount, productType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.paymentStatus = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to initiate payment.";
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to verify payment.";
      })
      .addCase(requestRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refundStatus = action.payload;
      })
      .addCase(requestRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(manualRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(manualRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refundStatus = action.payload;
      })
      .addCase(manualRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;

// Selectors
export const getPaymentStatus = (state) => state.payment.paymentStatus;
export const getPaymentLoading = (state) => state.payment.loading;
export const getPaymentError = (state) => state.payment.error;
export const getPaymentMessage = (state) => state.payment.message;
