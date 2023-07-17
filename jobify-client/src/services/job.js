import axios from "axios";

const userUrl = "/jobs";

// axios.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//      if (error.status.code === 401 ) {
//       store.dispatch(actions.logout());
//     }

//     return Promise.reject(error);
//   }
// );

export default class JobService {
  static jobsAPI = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static setupInterceptor = (unauthorizedHandler) => {
    this.jobsAPI.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          unauthorizedHandler();
        }
        return Promise.reject(error);
      }
    );
  };

  static getAll = ({ search, status, jobType, sort, page }) => {
    return this.jobsAPI.get(`${userUrl}`, {
      params: { search, status, jobType, sort, page },
    });
  };

  static search = ({ search, status, jobType, sort }) => {
    return this.jobsAPI.get(`${userUrl}`, {
      params: { search, status, jobType, sort },
    });
  };

  static createJob = (
    { position, company, location, jobType, status },
    userId
  ) => {
    return this.jobsAPI.post(`${userUrl}/`, {
      position,
      company,
      location,
      type: jobType,
      status,
      createdBy: userId,
    });
  };

  static deleteJob = ({ id }) => {
    return this.jobsAPI.delete(`${userUrl}/${id}`);
  };

  static updateJob = ({
    _id,
    position,
    company,
    location,
    jobType,
    status,
  }) => {
    return this.jobsAPI.patch(`${userUrl}/${_id}`, {
      position,
      company,
      location,
      type: jobType,
      status,
    });
  };

  static showStats = () => {
    return this.jobsAPI.get(`${userUrl}/stats`);
  };
}
