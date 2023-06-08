const createJob = (req, res) => {
  res.send('Create Job')
}

const getAllJobs = (req, res) => {
  res.send('Get All Job')
}

const updateJob = (req, res) => {
  res.send('Update Job')
}

const deleteJob = (req, res) => {
  res.send('Delete Job')
}

const showStats = (req, res) => {
  res.send('Show Stats')
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
