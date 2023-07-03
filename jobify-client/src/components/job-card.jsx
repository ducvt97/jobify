import moment from "moment/moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./job-info";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { setEditingJob } from "../store/jobReducer";
import { AllJobsContext } from "../contexts/all-jobs-context";

const JobCard = ({ jobDetail }) => {
  const { _id, company, position, status, type, location, createdAt } =
    jobDetail;
  const createdDate = moment(createdAt).format("MMM Do YY");
  const dispatch = useDispatch();
  const { deleteJob } = useContext(AllJobsContext);

  const onClickEdit = () => {
    dispatch(
      setEditingJob({
        jobId: _id,
        position: position,
        company: company,
        location: location,
        jobType: type,
        status: status,
      })
    );
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={createdDate} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick={onClickEdit}>
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default JobCard;
