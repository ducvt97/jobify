import axios from "axios";

const userUrl = "/jobs";

export default class JobService {
  static getAll = ({ search, status, jobType, sort, page }) => {
    return axios.get(`${userUrl}`, {
      params: { search, status, jobType, sort, page }
    });
  };

  static search = ({ search, status, jobType, sort }) => {
    return axios.get(`${userUrl}`, {
      params: { search, status, jobType, sort }
    });
  };

  static createJob = (
    { position, company, location, jobType, status },
    userId,
  ) => {
    return axios.post(
      `${userUrl}/`,
      {
        position,
        company,
        location,
        type: jobType,
        status,
        createdBy: userId,
      },
    );
  };

  static deleteJob = ({ id }) => {
    return axios.delete(`${userUrl}/${id}`);
  };

  static updateJob = (
    { _id, position, company, location, jobType, status }
  ) => {
    return axios.patch(
      `${userUrl}/${_id}`,
      {
        position,
        company,
        location,
        type: jobType,
        status,
      },
    );
  };

  static showStats = () => {
    return axios.get(`${userUrl}/stats`);
  };
}
