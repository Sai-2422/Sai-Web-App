import crypto from "crypto";
import { sendPasswordResetEmail } from "../../../../utils/emails/passwordReset.js";
import { sendWelcomeEmail } from "../../../../utils/emails/welcomeMail.js";
import { ApplicationError } from "../../../../utils/errorHandler.js";
import { sendToken } from "../../../../utils/sendToken.js";
import {
  findUserRepo,
  deleteUserRepo,
  getAllUsersRepo,
  createNewUserRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
  findUserForPasswordUsingOtpResetRepo,
  findUserForPasswordUsingTokenResetRepo,
} from "../models/user.repository.js";
import { deleteInternsByUserId } from "../../interns/model/interns.repository.js";
import { deleteOrdersByUserId } from "../../order/model/order.repository.js";

export const createNewUser = async (req, res, next) => {
  const updateData = { ...req.body };
  const profileImg = req.file;
  try {
    if (profileImg) {
      const base64Image = profileImg.buffer.toString("base64");
      updateData.profileImg = `data:${profileImg.mimetype};base64,${base64Image}`;
    }
    const newUser = await createNewUserRepo(updateData);
    await sendToken(newUser, res, 200);
    await sendWelcomeEmail(newUser);
  } catch (err) {
    if (err.statusCode == 11000 && err.keyPattern && err.keyPattern.email) {
      res
        .status(400)
        .send({ success: false, error: "email already registered" });
    } else {
      return next(new ApplicationError(400, err));
    }
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApplicationError(400, "please enter email/password"));
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      return next(
        new ApplicationError(401, "user not found! register yourself now!!")
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ApplicationError(401, "Invalid email or passsword!"));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ApplicationError(400, error));
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await findUserRepo({ email: email });
  if (!user) {
    return next(
      new ApplicationError(
        404,
        "User Not found. Please enter the correct email address"
      )
    );
  }
  const resetToken = await user.getResetPasswordToken();
  const resetOtp = await user.getResetPasswordOtp();
  await sendPasswordResetEmail(user, resetToken, resetOtp);
  return res.status(200).json({
    status: "success",
    message: `Reset password mail has been sent to ${user.email}`,
  });
};

export const resetUserPasswordUsingToken = async (req, res, next) => {
  try {
    const resetToken = req.params.token;
    const { password, confirmPassword } = req.body;
    if (!resetToken) {
      return next(
        new ApplicationError(
          400,
          "Please provide the token to reset the password"
        )
      );
    }
    if (!password || !confirmPassword) {
      return next(new ApplicationError(400, "Please provide the password"));
    }
    if (password !== confirmPassword) {
      return next(new ApplicationError(400, "The password is not matching"));
    }
    const hashToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await findUserForPasswordUsingTokenResetRepo(hashToken);
    if (!user) {
      return next(new ApplicationError(400, "Invalid or expired reset token"));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return next(new ApplicationError(500, "Internal server error"));
  }
};

export const resetUserPasswordUsingOtp = async (req, res, next) => {
  try {
    const { Otp, password, confirmPassword } = req.body;
    if (!Otp) {
      return next(
        new ApplicationError(
          400,
          "Please provide the Otp to reset the password"
        )
      );
    }
    if (!password || !confirmPassword) {
      return next(new ApplicationError(400, "Please provide the password"));
    }
    if (password !== confirmPassword) {
      return next(new ApplicationError(400, "The password is not matching"));
    }
    const user = await findUserForPasswordUsingOtpResetRepo(Otp);
    if (!user) {
      return next(new ApplicationError(400, "Invalid or expired reset Otp"));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return next(new ApplicationError(500, "Internal server error"));
  }
};

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ApplicationError(401, "please enter current password"));
    }

    const user = await findUserRepo({ _id: req.user._id }, true);

    if (user.resetPasswordToken && user.isResetTokenExpired()) {
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;

      // await UserModel.updateOne(
      //   { _id: user._id },
      //   { $unset: { resetPasswordToken: "", resetPasswordExpire: "" } }
      // );

      await user.save();
      return next(new ApplicationError(401, "Reset token has expired."));
    }

    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return next(new ApplicationError(401, "Incorrect current password!"));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ApplicationError(401, "mismatch new password and confirm password!")
      );
    }

    user.password = newPassword;
    await user.save();
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ApplicationError(400, error));
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const updateUserProfile = async (req, res, next) => {
  const updateData = { ...req.body };
  const profileImg = req.file;
  try {
    if (updateData.removeImage) {
      updateData.profileImg = null;
    }
    if (profileImg) {
      const base64Image = profileImg.buffer.toString("base64");
      updateData.profileImg = `data:${profileImg.mimetype};base64,${base64Image}`;
    }

    const updatedUserDetails = await updateUserProfileRepo(
      req.user._id,
      updateData
    );

    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ApplicationError(400, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Delete the user
    const deletedUser = await deleteUserRepo(userId);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "No user found with provided id" });
    }

    // Delete the interns associated with the user
    await deleteInternsByUserId(userId);
     // Delete the orders associated with the user
    await deleteOrdersByUserId(userId);

    res.status(200).json({
      success: true,
      msg: "User and associated interns deleted successfully",
      deletedUser,
    });
  } catch (error) {
    return next(new ApplicationError(400, error));
  }
};

export const updateUserProfileAndRole = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    const userId = req.params.id;
    const profileImg = req.file;

    const user = await findUserRepo({ _id: userId }, true);
    if (!user) {
      return next(
        new ApplicationError(
          404,
          "User not found. Please enter a valid user ID"
        )
      );
    }

    if (req.body.removeImage) {
      updateData.profileImg = null;
    }

    if (profileImg) {
      const base64Image = profileImg.buffer.toString("base64");
      updateData.profileImg = `data:${profileImg.mimetype};base64,${base64Image}`;
    }

    const userUpdate = await updateUserRoleAndProfileRepo(
      { _id: userId },
      updateData
    );

    if (!userUpdate) {
      return next(new ApplicationError(500, "Failed to update user"));
    } else {
      return res.status(200).json({
        status: "Success",
        result: "Updated user details",
        response: userUpdate,
      });
    }
  } catch (error) {
    return next(new ApplicationError(500, error.message));
  }
};
