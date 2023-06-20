import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../store/commonReducer";
import { JobsContainer, SearchContainer } from "../../components";
import JobService from "../../services/job";

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAlert());
    const fetchJobs = async () => {
      try {
        const res = await JobService.getAll(userState.token);
        const { jobs } = res.data;
        setJobs(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch, userState.token]);
  return (
    <>
      <SearchContainer />
      <JobsContainer jobs={jobs} />
    </>
  );
};

export default AllJobsPage;
