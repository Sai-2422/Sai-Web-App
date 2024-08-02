import express from "express";
import {
  createNewUser,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserDetails,
  getUserDetailsForAdmin,
  logoutUser,
  resetUserPasswordUsingToken,
  updatePassword,
  updateUserProfile,
  updateUserProfileAndRole,
  resetUserPasswordUsingOtp,
  userLogin,
} from "../controller/user.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";
import upload from "../../../../middlewares/fileupload.middleware.js";

const router = express.Router();

router.route("/signup").post(upload.single("profileImg"), createNewUser);
router.route("/login").post(userLogin);
router.route("/password/forget").post(forgetPassword);

router.route("/password/reset").put(resetUserPasswordUsingOtp);
router.route("/password/reset/:token").put(resetUserPasswordUsingToken);
router.route("/password/update").put(auth, upload.none(), updatePassword);
router
  .route("/profile/update")
  .put(auth, upload.single("profileImg"), updateUserProfile);

router.route("/details").get(auth, getUserDetails);
router.route("/logout").get(auth, logoutUser);

router
  .route("/admin/allusers")
  .get(auth, authByUserRole(["admin"]), getAllUsers);
router
  .route("/admin/details/:id")
  .get(auth, authByUserRole(["admin"]), getUserDetailsForAdmin);

router
  .route("/admin/delete/:id")
  .delete(auth, authByUserRole(["admin"]), deleteUser);

router
  .route("/admin/update/:id")
  .put(
    auth,
    authByUserRole(["admin"]),
    upload.single("profileImg"),
    updateUserProfileAndRole
  );

export default router;
