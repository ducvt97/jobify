import React, { useContext, useEffect } from "react";

import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./loading";
import JobCard from "./job-card";
import PagingContainer from "./paging-container";
import { AllJobsContext } from "../contexts/all-jobs-context";
import { useSelector } from "react-redux";

const JobsContainer = () => {
  const isLoading = useSelector((state) => state.common.isLoading);
  const {
    fetchJobs,
    state: { jobs, totalJobs },
  } = useContext(AllJobsContext);

  useEffect(() => {
    fetchJobs({});
  }, []);

  return isLoading ? (
    <Loading center={true} />
  ) : (
    <Wrapper>
      {!jobs || jobs.length === 0 ? (
        <h2>No jobs to display.</h2>
      ) : (
        <>
          <h5>
            {totalJobs || jobs.length} job
            {(totalJobs > 1 || jobs.length > 1) && "s"} found
          </h5>
          <div className="jobs">
            {jobs.map((val) => (
              <JobCard key={val._id} jobDetail={val} />
            ))}
          </div>
          <PagingContainer />
        </>
      )}
    </Wrapper>
  );
};

export default JobsContainer;
