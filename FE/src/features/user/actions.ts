import apiCaller from "../../api";
import QUERY_KEYS from "../../constants/QueryKey";

import { createAsyncThunk } from "@reduxjs/toolkit";

const registerUserFunc = async (params: any, { rejectWithValue }: any) => {
  try {
    return apiCaller(QUERY_KEYS.USERS.apiPath, "GET", params);
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
};

export const iGet = createAsyncThunk(QUERY_KEYS.USERS.endpoint.GET, registerUserFunc);
export const iAdd = createAsyncThunk(QUERY_KEYS.USERS.endpoint.ADD, registerUserFunc);
export const iUpdate = createAsyncThunk(QUERY_KEYS.USERS.endpoint.UPDATE, registerUserFunc);
export const iDelete = createAsyncThunk(QUERY_KEYS.USERS.endpoint.DETELE, registerUserFunc);
export const iGetAll = createAsyncThunk(QUERY_KEYS.USERS.endpoint.GETALL, registerUserFunc);

export default {
  iGet,
  iAdd,
  iUpdate,
  iDelete,
  iGetAll,
};
