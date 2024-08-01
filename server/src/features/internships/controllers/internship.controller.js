import { ApplicationError } from "../../../../utils/errorHandler.js";
import {
  createNewInternshipRepo,
  fetchAllInternshipRepo,
  updateInternshipRepo,
  deleteInternshipRepo,
} from "../model/internship.repository.js";

export const createNewInternship = async (req, res, next) => {
  const requestData = req.body;
  try {
    const internshipData = await createNewInternshipRepo(requestData);
    res.status(201).json({ success: true, internshipData });
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new ApplicationError(400, error.message || "Bad Request"));
    }
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const fetchAllInternship = async (req, res, next) => {
  try {
    const allInternships = await fetchAllInternshipRepo();
    res.status(200).json({ success: true, allInternships });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const updateInternship = async (req, res, next) => {
  const { internshipId } = req.params;
  const updatedData = req.body;
  try {
    const updatedInternship = await updateInternshipRepo(
      internshipId,
      updatedData
    );
    if (!updatedInternship) {
      return next(new ApplicationError(404, "Internship not found or not updated"));
    }
    res.status(200).json({ success: true, updatedInternship });
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new ApplicationError(400, error.message || "Bad Request"));
    }
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const deleteInternship = async (req, res, next) => {
  const { internshipId } = req.params;
  try {
    const result = await deleteInternshipRepo(internshipId);
    if (!result) {
      return next(new ApplicationError(404, "Internship not found"));
    }
    res
      .status(200)
      .json({ success: true, message: "Internship deleted successfully" });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};
