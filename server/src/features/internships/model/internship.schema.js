import mongoose from "mongoose";
const { Schema } = mongoose;

const internshipSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const InternshipModel = mongoose.model("Internship", internshipSchema);
export default InternshipModel;
