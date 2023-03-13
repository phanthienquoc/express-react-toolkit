// Need to use the React-specific entry point to import createApi
import QUERY_KEYS from "../../constants/QueryKey";

import { appQuery } from "../../api/apiCaller";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ConnectedDevice {}

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
const items = createApi({
  reducerPath: QUERY_KEYS.CONNECTED_DEVICES.reducerPath,
  baseQuery: appQuery(),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (params) => QUERY_KEYS.CONNECTED_DEVICES.pathName,
    }),
    getById: builder.query<ConnectedDevice, string>({
      query: (name) => `${QUERY_KEYS.CONNECTED_DEVICES.pathName}/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = items;

export default items;
