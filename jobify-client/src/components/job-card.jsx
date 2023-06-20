import moment from "moment/moment";
import React from "react";

const JobCard = ({ company, createdAt }) => {
  const createdDate = moment(createdAt).format("MMM Do YY");

  return (
    <div>
      <h5>{company}</h5>
      <h5>{createdDate}</h5>
    </div>
  );
};

export default JobCard;
