import React, { useState } from "react";
import { useSelector } from "react-redux";

import Wrapper from "../assets/wrappers/SearchContainer";
import Alert from "./alert";
import FormRow from "./form-row";
import FormRowSelect from "./form-row-select";

const defaultSearchFilters = {
  search: "",
  status: "all",
  jobType: "all",
  sort: "latest",
};

const typeOptions = ["all", "full-time", "part-time", "remote", "intern"];
const statusOptions = ["all", "interview", "declined", "pending"];
const sortOptions = ["latest", "oldest", "a-z", "z-a"];

const SearchContainer = ({ onSearch }) => {
  const [filters, setFilters] = useState(defaultSearchFilters);
  const commonState = useSelector((state) => state.common);
  const token = useSelector((state) => state.user.token);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    onSearch({ ...filters, [e.target.name]: e.target.value, token });
  };

  const clearFilters = () => {
    setFilters({ ...filters, ...defaultSearchFilters });
    onSearch({ ...filters, ...defaultSearchFilters, token });
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Jobs</h4>
        {commonState.showAlert && (
          <Alert text={commonState.alertText} type={commonState.alertType} />
        )}
        <div className="form-center">
          <FormRow
            value={filters.search}
            type="text"
            name="search"
            labelText="Search"
            handleChange={handleChange}
          />
          <FormRowSelect
            value={filters.jobType}
            name="jobType"
            labelText="Job Type"
            options={typeOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            value={filters.status}
            name="status"
            labelText="Job Status"
            options={statusOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            value={filters.sort}
            name="sort"
            labelText="Sort"
            options={sortOptions}
            handleChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
