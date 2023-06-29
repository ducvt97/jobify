import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/errors.js";
import Job from "../models/job.js";
import checkPermission from "../uitls/permission.js";
import moment from "moment/moment.js";

const jobStatuses = ["interview", "declined", "pending"];
const jobTypes = ["full-time", "part-time", "remote", "intern"];

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
  const { status, jobType, search, sort } = req.query;
  const queryObj = {};

  if (status && status !== "all") {
    queryObj.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObj.type = jobType;
  }

  if (search) {
    queryObj.position = { $regex: search };
  }

  let result = Job.find(queryObj);

  switch (sort) {
    case "latest":
      result = result.sort("-createdAt");
    case "oldest":
      result = result.sort("createdAt");
    case "a-z":
      result = result.sort("position");
    case "z-a":
      result = result.sort("-position");
  }

  const jobs = await result;

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

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const resultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications.map((item) => {
    const { year, month } = item._id;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MMM y");
    return { date, count: item.count };
  });

  res.status(StatusCodes.OK).json({ stats: resultStats, monthlyApplications });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
