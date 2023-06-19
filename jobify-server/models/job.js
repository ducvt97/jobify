import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company."],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide company."],
    maxLength: 50,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "remote", "intern"],
    default: "full-time",
  },
  location: {
    type: String,
    default: "My city",
    required: true,
    maxLength: 100,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user."],
  }
}, {
  timestamps: true
});

const Job = mongoose.model("Job", JobSchema);
export default Job;