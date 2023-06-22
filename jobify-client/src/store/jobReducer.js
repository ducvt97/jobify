import { createSlice } from "@reduxjs/toolkit";

const location = localStorage.getItem("location");

const initState = {
  isEditing: false,
  jobId: "",
  position: "",
  company: "",
  jobLocation: location || "",
  jobType: "full-time",
  status: "pending",
};

const jobSlice = createSlice({
  name: "Job",
  initialState: initState,
  reducers: {
    setEditingJob: (state, action) => {
      const { jobId, position, company, location, jobType, status } =
        action.payload;

      state.isEditing = true;
      state.jobId = jobId;
      state.position = position;
      state.company = company;
      state.jobLocation = location;
      state.jobType = jobType;
      state.status = status;
    },
    clearEditingJob: (state, _) => {
      state.isEditing = false;
      state.jobId = "";
      state.position = "";
      state.company = "";
      state.jobLocation = location || "";
      state.jobType = "full-time";
      state.status = "pending";
    },
  },
});

export const { setEditingJob, clearEditingJob } = jobSlice.actions;
export default jobSlice.reducer;
