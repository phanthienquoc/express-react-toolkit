import apiCaller from "../../api";
import QUERY_KEYS from "../../constants/QueryKey";

import { createAsyncThunk } from "@reduxjs/toolkit";

const registerUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(QUERY_KEYS.AUTHENTICATION.SIGNUP, "POST", params);
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

const signInUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(QUERY_KEYS.AUTHENTICATION.SIGNIN, "POST", params);
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

export const signUp = createAsyncThunk(QUERY_KEYS.AUTHENTICATION.SIGNUP, registerUserFunc);
export const signIn = createAsyncThunk(QUERY_KEYS.AUTHENTICATION.SIGNIN, signInUserFunc);
