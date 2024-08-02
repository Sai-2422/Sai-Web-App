import InternsModel from "./interns.schema.js";

export const applyNewInternRepo = async (internData) => {
  return await new InternsModel(internData).save();
};

export const getAllInternsRepo = async () => {
  return await InternsModel.find({}).populate({
    path: "userId",
    select: "name profileImg",
  });
};

export const getInternDetailsRepo = async (internId) => {
  return await InternsModel.findById(internId).populate({
    path: "userId",
    select: "name email contactNumber gender address profileImg",
  });
};

export const deleteInternRepo = async (internshipId) => {
  return await InternsModel.findByIdAndDelete(internshipId);
};

export const findInternEmailRepo = async (internId) => {
  return await InternsModel.findOne({ _id: internId }).populate({
    path: "userId",
    select: "name email",
  });
};
