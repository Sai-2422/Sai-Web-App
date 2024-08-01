import InternshipModel from "./internship.schema.js";

export const createNewInternshipRepo = async (internshipData) => {
  return await new InternshipModel(internshipData).save();
};

export const fetchAllInternshipRepo = async () => {
  return await InternshipModel.find({});
};

export const updateInternshipRepo = async (internshipId, updatedData) => {
  const result = await InternshipModel.updateOne(
    { _id: internshipId },
    { $set: updatedData }
  );
  return result.modifiedCount > 0 ? { id: internshipId, ...updatedData } : null;
};

export const deleteInternshipRepo = async (internshipId) => {
  const result = await InternshipModel.deleteOne({ _id: internshipId });
  return result.deletedCount > 0;
};
