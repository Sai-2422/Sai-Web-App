import jwt from "jsonwebtoken";
import { ApplicationError } from "../utils/errorHandler.js";
import UserModel from "../src/features/user/models/user.schema.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ApplicationError(401, "login to access this route!"));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  req.user = await UserModel.findById(decodedData.id);
  next();
};

export const authByUserRole = (roles) => {
  return async (req, res, next) => {
    if (req.user.role !== "admin") {
      return next(
        new ApplicationError(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
