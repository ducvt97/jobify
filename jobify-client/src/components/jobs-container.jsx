import React from "react";

import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./loading";
import JobCard from "./job-card";

const JobsContainer = ({ jobs, isLoading, deleteJob }) => {
  return isLoading ? (
    <Loading center={true} />
  ) : (
    <Wrapper>
      {!jobs || jobs.length === 0 ? (
        <h2>No jobs to display.</h2>
      ) : (
        <>
          <h5>
            {jobs.length} job{jobs.length > 1 && "s"} found
          </h5>
          <div className="jobs">
            {jobs.map((val) => (
              <JobCard key={val._id} jobDetail={val} deleteJob={deleteJob} />
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default JobsContainer;