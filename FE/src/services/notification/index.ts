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
const notificationApi = createApi({
  reducerPath: "adminManageNotification",
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
    getAll: builder.query({
      query: (params) => `notifications`,
    }),
    getById: builder.query<User, string>({
      query: (name) => `notifications/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = notificationApi;

export default notificationApi;
