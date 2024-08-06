import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/cart`;

const initialState = {
  loading: false,
  error: false,
  message: "",
  items: [],
  itemCount: 0,
};

// Thunk for fetch all cart items for particular user
export const fetchAllCartItems = createAsyncThunk(
  "cart/fetchAllCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/getAll`, {
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

// Thunk for fetch cart item count
export const fetchCartItemsCount = createAsyncThunk(
  "cart/fetchCartItemsCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/count`, {
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

// Thunk for add new cart item
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (itemData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      dispatch(fetchCartItemsCount()); // Refresh item count after adding
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for delete cart item count
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/delete/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      dispatch(fetchCartItemsCount()); // Refresh item count after deletion
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (payload, { rejectWithValue }) => {
    const { itemId, quantity } = payload;
    try {
      const response = await fetch(
        `${API_BASE_URL}/items/updateQuantity/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartItems.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = action.payload.data;
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch cart items.";
      })
      .addCase(fetchCartItemsCount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchCartItemsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.itemCount = action.payload.count;
      })
      .addCase(fetchCartItemsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to fetch cart items count.";
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "New cart item added successfully.";
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to add new cart item.";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "Cart item quantity updated successfully.";
        // Update the quantity of the item in the state
        const { _id, quantity } = action.payload;
        state.items = state.items.map((item) =>
          item._id === _id ? { ...item, quantity } : item
        );
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.payload || "Failed to update cart item quantity.";
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "Cart item deleted successfully.";
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || "Failed to delete cart item.";
      });
  },
});

export default cartSlice.reducer;

export const getError = (state) => state.cart.error;
export const getAllCartItems = (state) => state.cart.items;
export const getItemCount = (state) => state.cart.itemCount;
export const getCartItem = (state) => state.cart.itemDetails;
export const getLoadingState = (state) => state.cart.loading;
export const getErrorMessage = (state) => state.cart.message;
