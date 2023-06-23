import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  displayAlert,
  setLoading,
} from "../../store/commonReducer";
import { JobsContainer, SearchContainer } from "../../components";
import JobService from "../../services/job";

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const userState = useSelector((state) => state.user);
  const isloading = useSelector((state) => state.common.isloading);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      const res = await JobService.getAll(userState.token);
      const { jobs } = res.data;
      setJobs(jobs);
    } catch (error) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteJob = async (jobId) => {
    dispatch(setLoading(true));
    try {
      await JobService.deleteJob({ id: jobId, token: userState.token });
      fetchJobs();
    } catch (error) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(clearAlert());
    fetchJobs();
  }, [dispatch, userState.token]);
  return (
    <>
      <SearchContainer />
      <JobsContainer jobs={jobs} isLoading={isloading} deleteJob={deleteJob} />
    </>
  );
};

export default AllJobsPage;
