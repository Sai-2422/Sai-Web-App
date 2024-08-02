import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    maxLength: [35, "User name can't exceed 35 characters"],
    minLength: [2, "Name should have at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: [true, "Email already registered"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    unique: true,
    validate: {
      validator: (v) => /\d{10}/.test(v),
      message: "Please enter a valid contact number",
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    maxLength: [100, "Address can't exceed 100 characters"],
  },
  profileImg: {
    type: String,
  },
  role: {
    type: String,
    default: "customer",
    enum: ["admin", "customer", "student"],
  },
  resetPasswordOtp: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      return next();
    }

    if (!user.password) {
      throw new Error("Password is undefined or NaN");
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const hashedPassword = await bcrypt.hash(update.password, 12);
      update.password = hashedPassword;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.isResetTokenExpired = function () {
  return Date.now() > this.resetPasswordExpire;
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await this.save();

  return resetToken;
};

userSchema.methods.getResetPasswordOtp = async function () {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  this.resetPasswordOtp = String(OTP);
  await this.save();

  return OTP;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
