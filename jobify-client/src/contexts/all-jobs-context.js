import { createContext, useReducer } from "react";

import JobService from "../services/job";
import { useDispatch } from "react-redux";
import { displayAlert, setLoading } from "../store/commonReducer";

const initialState = {
  jobs: [],
  filters: {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  },
  page: 1,
  totalJobs: 0,
  numOfPages: 1,
};

const AllJobsContext = createContext();

const AllJobsActions = {
  fetchJobs: "FETCH_JOBS",
  deleteJob: "DELETE_JOB",
};

const AllJobsReducer = (prevState, action) => {
  switch (action.type) {
    case AllJobsActions.fetchJobs:
      return {
        ...prevState,
        jobs: action.payload.jobs || prevState.jobs,
        filters: action.payload.filters || prevState.filters,
        page: action.payload.page || prevState.page,
        totalJobs: action.payload.totalJobs || prevState.totalJobs,
        numOfPages: action.payload.numOfPages || prevState.numOfPages,
      };
    case AllJobsActions.deleteJob:
      return {
        ...prevState,
        jobs: action.payload.jobs || prevState.jobs,
        filters: action.payload.filters || prevState.filters,
        page: action.payload.page || prevState.page,
        totalJobs: action.payload.totalJobs || prevState.totalJobs,
        numOfPages: action.payload.numOfPages || prevState.numOfPages,
      };
    default:
      throw new Error(`Action ${action.type} not recognized.`);
  }
};

const AllJobsProvider = (props) => {
  const [state, dispatch] = useReducer(AllJobsReducer, initialState);
  const dispatchStore = useDispatch();

  const fetchJobs = async ({ search, status, jobType, sort, page }) => {
    try {
      dispatchStore(setLoading(true));
      const res = await JobService.getAll({
        search,
        status,
        jobType,
        sort,
        page,
      });
      const { jobs, page: curPage, totalJobs, numOfPages } = res.data;

      dispatch({
        type: AllJobsActions.fetchJobs,
        payload: {
          jobs,
          filters: { search, status, jobType, sort },
          page: curPage,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      dispatchStore(
        displayAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );
    } finally {
      dispatchStore(setLoading(false));
    }
  };

  const deleteJob = async (jobId) => {
    try {
      dispatchStore(setLoading(true));
      await JobService.deleteJob({ id: jobId });
      fetchJobs({ ...state.filters, page: state.page });
    } catch (error) {
      dispatchStore(
        displayAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );
    } finally {
      dispatchStore(setLoading(false));
    }
  };

  return (
    <AllJobsContext.Provider
      value={{
        state,
        fetchJobs,
        deleteJob,
      }}
    >
      {props.children}
    </AllJobsContext.Provider>
  );
};

export { AllJobsContext, AllJobsProvider };
