// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { appQuery } from "../../api/apiCaller";

import QUERY_KEYS from "../../constants/QueryKey";

interface QRCode {}

// Define a service using a base URL and expected endpoints
const api = createApi({
  reducerPath: QUERY_KEYS.QR_CODE.reducerPath,
  baseQuery: appQuery(),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (params) => QUERY_KEYS.QR_CODE.pathName,
    }),
    getById: builder.query<QRCode, string>({
      query: (name) => `${QUERY_KEYS.QR_CODE.pathName}/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = api;

export default api;
