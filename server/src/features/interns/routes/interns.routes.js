import express from "express";
import {
  applyInternship,
  deleteInternship,
  getAllInterns,
  getInternDetails,
  sendOfferLetter,
  sendCertificate,
} from "../controllers/interns.controller.js";
import { auth, authByUserRole } from "../../../../middlewares/auth.js";
import upload from "../../../../middlewares/fileupload.middleware.js";

const router = express.Router();
router.route("/allInterns").get(auth, authByUserRole("admin"), getAllInterns);
router
  .route("/internDetails/:internId")
  .get(auth, authByUserRole("admin"), getInternDetails);
router.route("/apply").post(auth, upload.none(), applyInternship);
router.route("/delete").post(auth, authByUserRole("admin"), deleteInternship);
router
  .route("/sendOfferLetter")
  .post(auth, authByUserRole("admin"), sendOfferLetter);
router
  .route("/sendCertificate")
  .post(auth, authByUserRole("admin"), sendCertificate);

export default router;
