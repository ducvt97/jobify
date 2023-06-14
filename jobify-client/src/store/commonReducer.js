import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
};

const commonSlice = createSlice({
  name: "Common",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    displayAlert: (state, action) => {
      state.showAlert = true;
      state.alertType = action.payload.alertType;
      state.alertText = action.payload.alertText;
    },
    clearAlert: (state, _) => {
      state.showAlert = false;
      state.alertType = "";
      state.alertText = "";
    },
    toggleSidebar: (state, _) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { setLoading, displayAlert, clearAlert, toggleSidebar } =
  commonSlice.actions;
export default commonSlice.reducer;
