import { ApplicationError } from "../../../../utils/errorHandler.js";
import { sendOfferLetterEmail } from "../../../../utils/emails/sendOfferLetter.js";
import { sendCertificateEmail } from "../../../../utils/emails/sendCertificate.js";
import {
  applyNewInternRepo,
  getAllInternsRepo,
  getInternDetailsRepo,
  deleteInternRepo,
  findInternEmailRepo,
} from "../../interns/model/interns.repository.js";

export const applyInternship = async (req, res, next) => {
  const requestData = req.body;
  try {
    const randomId = `SAI${Math.floor(100000 + Math.random() * 900000)}`;
    requestData.ID = randomId;
    const internData = await applyNewInternRepo(requestData);
    res.status(201).json({ success: true, internData });
  } catch (error) {
    return next(
      new ApplicationError(500, error.message || "Internal Server Error")
    );
  }
};

export const deleteInternship = async (req, res, next) => {
  const { internshipId } = req.body;
  try {
    if (!internshipId) {
      return res
        .status(400)
        .json({ success: false, error: "Internship ID is required" });
    }
    const result = await deleteInternRepo(internshipId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Internship not found" });
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

export const getAllInterns = async (req, res, next) => {
  try {
    const allInterns = await getAllInternsRepo();
    res.status(200).json({ success: true, allInterns });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const getInternDetails = async (req, res, next) => {
  const { internId } = req.params;

  try {
    const internDetails = await getInternDetailsRepo(internId);
    if (!internDetails) {
      return res
        .status(404)
        .json({ success: false, error: "Intern not found" });
    }
    res.json({ success: true, internDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sendOfferLetter = async (req, res, next) => {
  const { internId } = req.params;
  try {
    const intern = await findInternEmailRepo(internId);
    sendOfferLetterEmail(intern);
    return res
      .status(201)
      .json({ success: true, error: "Offer Letter Send Successfully" });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};

export const sendCertificate = async (req, res, next) => {
  const { internId } = req.params;
  try {
    const intern = await findInternEmailRepo(internId);
    sendCertificateEmail(intern);
    return res
      .status(201)
      .json({ success: true, error: "Certificate Send Successfully" });
  } catch (error) {
    return next(new ApplicationError(500, error));
  }
};
