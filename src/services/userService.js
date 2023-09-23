import { cartReset } from "../features/cartSlice";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutAction,
  registerFailure,
  registerStart,
  registerSuccess,
  updateUserSuccess,
} from "../features/userSlice";

import { axiosInstance } from "../services/ApiClient";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    return "An error occurred during registration.";
  }
};

export const logout = async dispatch => {
  dispatch(cartReset());
  dispatch(logoutAction());
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await axiosInstance.post("/users/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
    return error.response
      ? error.response.data
      : "An error occurred during registration.";
  }
};

export const updateUser = async (dispatch, data) => {
  try {
    console.log("test",data );
    const response = await axiosInstance.put(`/users/${data.user._id}`, data);
    dispatch(updateUserSuccess(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
