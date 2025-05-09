const Job = require("../models/job");
const { BadRequest, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(200).json({ jobs });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: {company,position},
    user: { userId },
    params: { id: jobId },
  } = req;

  if(company === ' ' || position === ' '){
    throw new BadRequest('Company and position cannot be empty')
  }
  const job = await Job.findByIdAndUpdate({
    _id: jobId,
    createdBy: userId
  },req.body, {new:true, runValidators:true}) 
// new:true => Return the updated document (not the old one)
// runValidators:true => Re-check the validation rules (like required fields, length limits) when updating.
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({
    _id:jobId,
    createdBy:userId
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).send()
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
