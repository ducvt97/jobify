import React, { useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Wrapper from "../assets/wrappers/SearchContainer";
import Alert from "./alert";
import FormRow from "./form-row";
import FormRowSelect from "./form-row-select";
import { AllJobsContext } from "../contexts/all-jobs-context";

const defaultSearchFilters = {
  search: "",
  status: "all",
  jobType: "all",
  sort: "latest",
};

const typeOptions = ["all", "full-time", "part-time", "remote", "intern"];
const statusOptions = ["all", "interview", "declined", "pending"];
const sortOptions = ["latest", "oldest", "a-z", "z-a"];

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const commonState = useSelector((state) => state.common);

  const {
    fetchJobs,
    state: { filters },
  } = useContext(AllJobsContext);

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchJobs({ ...filters, [e.target.name]: e.target.value });
      }, 2000);
    };
  };

  const debounceMemo = useMemo(() => debounce(), []);

  const handleChange = (e) => {
    fetchJobs({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setLocalSearch("");
    fetchJobs({ ...filters, ...defaultSearchFilters });
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
            value={localSearch}
            type="text"
            name="search"
            labelText="Search"
            handleChange={debounceMemo}
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
