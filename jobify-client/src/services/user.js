import axios from "axios";

const userUrl = '/auth'

export const register = () => {
    return axios.post(`${userUrl}/register`, {
        name: "Duc",
        email: "test@mail.com",
        password: "123456"
    })
}