// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import internsReducer from "../reducers/internsReducer";
import productReducer from "../reducers/productReducer";
import paymentReducer from "../reducers/paymentReducer";
import hsrporderReducer from "../reducers/hsrporderReducer";
import internshipReducer from "../reducers/internshipReducer";
import cartItemReducer from "../reducers/cartItemReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartItemReducer,
    product: productReducer,
    interns: internsReducer,
    payment: paymentReducer,
    hsrpOrders: hsrporderReducer,
    internship: internshipReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Expose the store to window for debugging in development mode
if (process.env.NODE_ENV === "development") {
  window.store = store;
}
