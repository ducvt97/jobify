import axios from "axios";

const userUrl = "/jobs";

export default class JobService {
  static getAll = ({ search, status, jobType, sort, token }) => {
    return axios.get(`${userUrl}`, {
      params: { search, status, jobType, sort },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static search = ({ search, status, jobType, sort, token }) => {
    return axios.get(`${userUrl}`, {
      params: { search, status, jobType, sort },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static createJob = (
    { position, company, location, jobType, status },
    userId,
    token
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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  static deleteJob = ({ id, token }) => {
    return axios.delete(`${userUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static updateJob = (
    { _id, position, company, location, jobType, status },
    token
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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  static showStats = (token) => {
    return axios.get(`${userUrl}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
