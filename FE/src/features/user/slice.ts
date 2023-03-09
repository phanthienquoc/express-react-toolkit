import { QUERY_KEY_USER } from "../../constants/QueryKey";
import { createSlice } from "@reduxjs/toolkit";
import action from "./actions";

const initialState = {
  users: [],
  error: null,
  success: null,
  loading: false,
};

const userSlice = createSlice({
  name: QUERY_KEY_USER.NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.iGetAll.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(action.iGetAll.fulfilled, (state: any, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.success = true;
      })
      .addCase(action.iGetAll.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default userSlice.reducer;
