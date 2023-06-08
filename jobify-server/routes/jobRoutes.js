import express from 'express'

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js'

const jobRouter = express.Router()

jobRouter.route('/').get(getAllJobs).post(createJob)
jobRouter.route('/:id').delete(deleteJob).patch(updateJob)
jobRouter.route('/stats').get(showStats)

export default jobRouter
