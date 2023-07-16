import axios from "axios";

const userUrl = "/auth";

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

  static update = ({ name, lastName, email, location }) => {
    return axios.patch(
      `${userUrl}/updateUser`,
      {
        name,
        lastName,
        email,
        location,
      },
    );
  };
}
