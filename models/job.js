const mongoose = require("mongoose");
const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      MaxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      MaxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"], // arrays with possible vals
    },
    createdBy: {
      // tieing the jobs with user
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobsSchema);
