import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  displayAlert,
  setLoading,
} from "../../store/commonReducer";
import { JobsContainer, SearchContainer } from "../../components";
import JobService from "../../services/job";
import { AllJobsProvider } from "../../contexts/all-jobs-context";

const AllJobsPage = () => {
  const dispatch = useDispatch();

  const deleteJob = async (jobId) => {
    dispatch(setLoading(true));
    try {
      await JobService.deleteJob({ id: jobId });
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
    dispatch(clearAlert());
  }, []);

  return (
    <AllJobsProvider>
      <SearchContainer />
      <JobsContainer deleteJob={deleteJob} />
    </AllJobsProvider>
  );
};

export default AllJobsPage;
