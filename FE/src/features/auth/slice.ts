import { signUp, signIn } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {},
  access_token: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUp.fulfilled, (state: any, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.data.token;
        state.success = true;
      })
      .addCase(signUp.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(signIn.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signIn.fulfilled, (state: any, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.data.token;
        state.success = true;
      })
      .addCase(signIn.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default authSlice.reducer;
