import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: null,
  userLocation: "",
};

// const addUserToLocalStorage = ({ user, token, userLocation }) => {
//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("token", token);
//   localStorage.setItem("location", userLocation);
// };
// const removeUserFromLocalStorage = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
//   localStorage.removeItem("location");
// };

const userSlice = createSlice({
  initialState: initState,
  name: "User",
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.userLocation = action.payload.userLocation;
      // addUserToLocalStorage(state);
    },
    logout: (state, _) => {
      state.user = null;
      state.userLocation = "";
      // removeUserFromLocalStorage();
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
      state.userLocation = action.payload.userLocation;
      // addUserToLocalStorage(state);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.userLocation = action.payload.userLocation;
    },
  },
});

export const { login, logout, updateUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
