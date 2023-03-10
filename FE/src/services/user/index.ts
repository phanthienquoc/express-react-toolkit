// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store/store";

interface User {}

type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;
// Define a service using a base URL and expected endpoints
const userApi = createApi({
  reducerPath: "adminManageUser",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001/api/",
    prepareHeaders: (headers, { getState }: any) => {
      const userData: any = (getState() as RootState).auth.user;
      const token: string = userData.access_token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Content-Type", "application/json");
        headers.set("x_authorization", token);
      }
      console.log(headers);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => `users`,
    }),
    getUserById: builder.query<User, string>({
      query: (name) => `users/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useGetUserByIdQuery } = userApi;

export default userApi;
