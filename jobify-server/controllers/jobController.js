import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/errors.js";
import Job from "../models/job.js";
import checkPermission from "../uitls/permission.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values.");
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({
    job,
  });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs, total: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values.");
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotFoundError(`Job not found with id: ${jobId}`);
  }

  checkPermission(req.user.userId, job.createdBy.toString());

  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotFoundError(`Job not found with id: ${jobId}`);
  }

  checkPermission(req.user.userId, job.createdBy.toString());

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Deleted." });
};

const showStats = (req, res) => {
  res.send("Show Stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
