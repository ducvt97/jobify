import axios from "axios";

const userUrl = "/jobs";

export default class JobService {
  static getAll = (token) => {
    return axios.get(`${userUrl}/`, {
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
    return axios.delete(`${userUrl}/:${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
