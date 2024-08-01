// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import productReducer from "../reducers/productReducer";
import internsReducer from "../reducers/internsReducer";
import orderReducer from "../reducers/orderReducer"
import internshipReducer from "../reducers/internshipReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    interns: internsReducer,
    internship: internshipReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Expose the store to window for debugging in development mode
if (process.env.NODE_ENV === "development") {
  window.store = store;
}
