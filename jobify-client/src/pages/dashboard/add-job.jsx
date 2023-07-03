import React, { StrictMode, useEffect, useState } from "react";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { Alert, FormRow, FormRowSelect } from "../../components";
import {
  clearAlert,
  displayAlert,
  setLoading,
} from "../../store/commonReducer";
import JobService from "../../services/job";
import { clearEditingJob } from "../../store/jobReducer";

const typeOptions = ["full-time", "part-time", "remote", "intern"];
const statusOptions = ["interview", "declined", "pending"];

const AddJobPage = () => {
  const user = useSelector((state) => state.user.user);
  const currentToken = useSelector((state) => state.user.token);
  const commonState = useSelector((state) => state.common);
  const { isEditing, jobId, position, company, jobLocation, jobType, status } =
    useSelector((state) => state.job);
  const [values, setValues] = useState({
    jobId: jobId || null,
    position: position || "",
    company: company || "",
    location: jobLocation || "",
    type: jobType,
    status: status,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAlert());
      dispatch(clearEditingJob());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearValues = () => {
    if (isEditing) {
      setValues({
        jobId: jobId,
        position: position,
        company: company,
        location: jobLocation,
        type: jobType,
        status: status,
      });
      return;
    }
    setValues({
      jobId: null,
      position: "",
      company: "",
      location: jobLocation || "",
      type: jobType,
      status: status,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const { jobId, position, company, location, type, status } = values;
    if (!position || !company || !location) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: "Please provide all values.",
        })
      );
      dispatch(setLoading(false));
      return;
    } else {
      dispatch(clearAlert());
    }

    try {
      let alertText;

      if (!isEditing) {
        await JobService.createJob(
          { position, company, location, type, status },
          user.userId,
          currentToken
        );

        alertText = "Job Created Successfully!";
        clearValues();
      } else {
        await JobService.updateJob(
          { _id: jobId, position, company, jobType: type, status },
          currentToken
        );

        alertText = "Job Updated Successfully!";
      }

      dispatch(
        displayAlert({
          alertType: "success",
          alertText: alertText,
        })
      );

      setTimeout(() => dispatch(clearAlert()), 2000);
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

  return (
    <StrictMode>
      <Wrapper>
        <form action="" onSubmit={handleSubmit}>
          <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
          {commonState.showAlert && (
            <Alert text={commonState.alertText} type={commonState.alertType} />
          )}
          <div className="form-center">
            <FormRow
              value={values.position}
              type="text"
              name="position"
              labelText="Position"
              handleChange={handleChange}
            />
            <FormRow
              value={values.company}
              type="text"
              name="company"
              labelText="Company"
              handleChange={handleChange}
            />
            <FormRow
              value={values.location}
              type="text"
              name="location"
              labelText="Job Location"
              handleChange={handleChange}
            />
            <FormRowSelect
              value={values.type}
              name="type"
              labelText="Job Type"
              options={typeOptions}
              handleChange={handleChange}
            />
            <FormRowSelect
              value={values.status}
              name="status"
              labelText="Job Status"
              options={statusOptions}
              handleChange={handleChange}
            />
            <div className="btn-container">
              <button
                type="submit"
                className="btn btn-block submit-btn"
                disabled={commonState.isLoading}
              >
                {commonState.isLoading ? "Please wait..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-block clear-btn"
                onClick={clearValues}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    </StrictMode>
  );
};

export default AddJobPage;
