import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    logoutAction: state => {
      state.currentUser = null;
    },
    registerStart: state => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutAction,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;