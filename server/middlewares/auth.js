import jwt from "jsonwebtoken";
import { ApplicationError } from "../utils/errorHandler.js";
import UserModel from "../src/features/user/models/user.schema.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ApplicationError(401, "Login to access this route!"));
  }

  try {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decodedData.id);

    if (!req.user) {
      return next(new ApplicationError(401, "User not found!"));
    }

    next();
  } catch (error) {
    return next(new ApplicationError(401, "Invalid or expired token!"));
  }
};

export const authByUserRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
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

