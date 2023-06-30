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
  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.user.token);
  const isloading = useSelector((state) => state.common.isloading);
  const dispatch = useDispatch();

  const fetchJobs = async ({ search, status, jobType, sort, token }) => {
    try {
      const res = await JobService.getAll({
        search,
        status,
        jobType,
        sort,
        token,
      });
      const { jobs, totalJobs, numOfPages } = res.data;
      setJobs(jobs);
      setTotalJobs(totalJobs);
      setNumOfPages(numOfPages);
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
      await JobService.deleteJob({ id: jobId, token });
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
    fetchJobs({ token });
  }, [dispatch, token]);

  return (
    <>
      <SearchContainer onSearch={fetchJobs} />
      <JobsContainer
        jobs={jobs}
        totalJobs={totalJobs}
        isLoading={isloading}
        deleteJob={deleteJob}
      />
    </>
  );
};

export default AllJobsPage;
