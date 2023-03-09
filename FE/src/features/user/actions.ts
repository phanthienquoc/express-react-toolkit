import apiCaller from "../../api";

import { USER_PATH } from "../../api/path";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { QUERY_KEY_USER } from "../../constants/QueryKey";

const registerUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(USER_PATH, "GET", params);
  } catch (error: any) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

export const iGet = createAsyncThunk(QUERY_KEY_USER.GET, registerUserFunc);
export const iAdd = createAsyncThunk(QUERY_KEY_USER.ADD, registerUserFunc);
export const iUpdate = createAsyncThunk(QUERY_KEY_USER.UPDATE, registerUserFunc);
export const iDelete = createAsyncThunk(QUERY_KEY_USER.DETELE, registerUserFunc);
export const iGetAll = createAsyncThunk(QUERY_KEY_USER.GETALL, registerUserFunc);

export default {
  iGet,
  iAdd,
  iUpdate,
  iDelete,
  iGetAll,
};
