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
      });
  },
});

export default paymentSlice.reducer;

// Selectors
export const getPaymentStatus = (state) => state.payment.paymentStatus;
export const getPaymentLoading = (state) => state.payment.loading;
export const getPaymentError = (state) => state.payment.error;
export const getPaymentMessage = (state) => state.payment.message;
