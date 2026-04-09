const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  jobId:String, 
  title: String,
  company: String,
  location: String,
  url: String,
  skills: [String],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Internship", internshipSchema);