// Need to use the React-specific entry point to import createApi
import QUERY_KEYS from "../../constants/QueryKey";

import { appQuery } from "./../../api/apiCaller";
import { createApi } from "@reduxjs/toolkit/query/react";

interface User {}

// Define a service using a base URL and expected endpoints
const api = createApi({
  reducerPath: QUERY_KEYS.USERS.reducerPath,
  baseQuery: appQuery(),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (params) => QUERY_KEYS.USERS.pathName,
    }),
    getById: builder.query<User, string>({
      query: (name) => `${QUERY_KEYS.USERS.pathName}/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = api;

export default api;
