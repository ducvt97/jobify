import axios from "axios";

const userUrl = "/jobs";

export default class JobService {
  static getAll = () => {}

  static createJob = ({
    position,
    company,
    location,
    jobType,
    status
  }, userId, token) => {
    return axios.post(`${userUrl}/`, {
      position,
      company,
      location,
      type: jobType,
      status,
      createdBy: userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
}