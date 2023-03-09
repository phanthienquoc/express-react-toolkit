import apiCaller from "../../api";

import { AUTH_PATH } from "../../api/path";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { QUERY_KEY_AUTHENTICATION } from "../../constants/QueryKey";

const registerUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(AUTH_PATH.SIGNUP, "POST", params);
  } catch (error: any) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

const signInUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(AUTH_PATH.SIGNIN, "POST", params);
  } catch (error: any) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

export const signUp = createAsyncThunk(QUERY_KEY_AUTHENTICATION.SIGNUP, registerUserFunc);
export const signIn = createAsyncThunk(QUERY_KEY_AUTHENTICATION.SIGNIN, signInUserFunc);
