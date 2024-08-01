import express from "express";
import {
  createNewInternship,
  fetchAllInternship,
  updateInternship,
  deleteInternship,
} from "../controllers/internship.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";

const router = express.Router();
router
  .route("/create")
  .post(auth, authByUserRole("admin"), createNewInternship);
router.route("/fetchAll").get(auth, fetchAllInternship);
router.route("/update/:internshipId").put(auth, updateInternship);
router.route("/delete/:internshipId").delete(auth, deleteInternship);

export default router;
