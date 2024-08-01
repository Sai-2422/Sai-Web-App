import mongoose from "mongoose";

const { Schema } = mongoose;

const internsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  internType: {
    type: String,
    enum: ["internship", "apprenticeship"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Duration must be at least 1 month"],
    max: [3, "Duration cannot exceed 3 months"],
  },
});

const InternsModel = mongoose.model("Interns", internsSchema);
export default InternsModel;
