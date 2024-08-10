import express from "express";
import cors from "cors";

import {
  ApplicationErrorMiddleware,
  handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";

import userRoutes from "./src/features/user/routes/user.routes.js";
import internsRoutes from "./src/features/interns/routes/interns.routes.js";
import paymentRoutes from "./src/features/payments/routes/payment.routes.js"
import productRoutes from "./src/features/products/routes/product.routes.js";
import cartItemsRoutes from "./src/features/cartItems/routes/cartItem.routes.js"
import hsrporderRoutes from "./src/features/hsrpOrder/routes/hsrporder.routes.js";
import internshipRoutes from "./src/features/internships/routes/internship.routes.js";
import productorderRoutes from "./src/features/productOrder/routes/productorder.routes.js"

const app = express();
app.use(
  cors({
    origin: `https://shivshaktiagroindustries.vercel.app`,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to NodeJs App");
});

app.use("/api/sai/user", userRoutes);
app.use("/api/sai/cart", cartItemsRoutes);
app.use("/api/sai/product", productRoutes);
app.use("/api/sai/interns", internsRoutes);
app.use('/api/sai/payment', paymentRoutes);
app.use("/api/sai/hsrp-order", hsrporderRoutes);
app.use("/api/sai/internship", internshipRoutes);
app.use("/api/sai/product-order", productorderRoutes);

app.use(ApplicationErrorMiddleware);
app.use(handleUncaughtError);

export default app;
