import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

const configPath = path.resolve("config", "uat.env");
dotenv.config({ path: configPath });

import {
  ApplicationErrorMiddleware,
  handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";

import userRoutes from "./src/features/user/routes/user.routes.js";
import orderRoutes from "./src/features/order/routes/order.routes.js";
import internsRoutes from "./src/features/interns/routes/interns.routes.js";
import productRoutes from "./src/features/products/routes/product.routes.js";
import internshipRoutes from "./src/features/internships/routes/internship.routes.js";

const app = express();
app.use(
  cors({
    origin: `http://localhost:${process.env.CLI_PORT}`,
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
app.use("/api/sai/order", orderRoutes);
app.use("/api/sai/product", productRoutes);
app.use("/api/sai/interns", internsRoutes);
app.use("/api/sai/internship", internshipRoutes);

app.use(ApplicationErrorMiddleware);
app.use(handleUncaughtError);

export default app;
