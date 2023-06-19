import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/errors.js";
import Job from "../models/job.js";

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

const updateJob = (req, res) => {
  res.send("Update Job");
};

const deleteJob = (req, res) => {
  res.send("Delete Job");
};

const showStats = (req, res) => {
  res.send("Show Stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
