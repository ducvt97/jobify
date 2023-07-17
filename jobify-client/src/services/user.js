import axios from "axios";

const userUrl = "/auth";

const userUpdateAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default class UserService {
  static register = ({ name, email, password }) => {
    return axios.post(`${userUrl}/register`, {
      name: name,
      email: email,
      password: password,
    });
  };

  static login = ({ email, password }) => {
    return axios.post(`${userUrl}/login`, {
      email: email,
      password: password,
    });
  };

  static logout = () => {
    return axios.post(`${userUrl}/logout`);
  };

  static update = (
    { name, lastName, email, location },
    unauthorizedHandler
  ) => {
    userUpdateAPI.interceptors.response.use(
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

    return userUpdateAPI.patch(`${userUrl}/updateUser`, {
      name,
      lastName,
      email,
      location,
    });
  };

  static getCurrentUser = () => {
    return axios.get(`${userUrl}/getCurrentUser`);
  };
}
