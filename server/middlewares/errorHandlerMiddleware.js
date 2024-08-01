import { ApplicationError } from "../utils/errorHandler.js";
import mongoose from "mongoose"; 

/**
 * Middleware to handle application errors.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const ApplicationErrorMiddleware = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ success: false, error: err.message });
  }

  if (err instanceof ApplicationError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ success: false, error: message });
};


export const handleUncaughtError = () => {
  process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down server due to an uncaught exception.");
    process.exit(1); 
  });
};
