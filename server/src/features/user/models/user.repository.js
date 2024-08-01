import UserModel from "./user.schema.js";

export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) {
    return await UserModel.findOne(factor).select("+password");
  } else return await UserModel.findOne(factor);
};

export const findUserForPasswordUsingTokenResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
  });
};

export const findUserForPasswordUsingOtpResetRepo = async (
  resetPasswordOtp
) => {
  return await UserModel.findOne({
    resetPasswordOtp: resetPasswordOtp,
  });
};

export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
  return await UserModel.findByIdAndUpdate(_id, data, {
    new: true,
  });
};
