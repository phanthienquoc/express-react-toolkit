import axios from "axios";
import type { RootState } from "../store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = "http://localhost:4001";

const request = (path: string, method: string, isAuth = false, params: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      x_authorization: "",
    },
  };

  if (isAuth) {
    config.headers.x_authorization = `Bearer ${localStorage.getItem("access_token")}`;
  }

  switch (method) {
    case "GET": {
      return axios.post(`${backendURL}/${path}`, config);
    }
    case "POST": {
      return axios.post(`${backendURL}/${path}`, params, config);
    }
    case "PUT": {
      return axios.put(`${backendURL}/${path}`, params, config);
    }
    case "DETELE": {
      return axios.delete(`${backendURL}/${path}`, config);
    }
  }
};

export const authRequest = (path: string, method: string, params: any) => {
  return request(path, method, true, params);
};

export const commonRequest = (path: string, method: string, params: any) => {
  return request(path, method, false, params);
};

export const appQuery = () => {
  return fetchBaseQuery({
    baseUrl: "http://localhost:4001/api/",
    prepareHeaders: (headers, { getState }: any) => {
      const userData: any = (getState() as RootState).auth.user;
      const token: string = userData.access_token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Content-Type", "application/json");
        headers.set("x_authorization", token);
      }

      return headers;
    },
  });
};

export const appCreateApi = ({ enpoints, reducerPath }: any) => {
  return createApi({
    endpoints: enpoints,
    baseQuery: appQuery(),
    reducerPath: reducerPath,
  });
};

export default commonRequest;

// type prepareHeaders = (
//   headers: Headers,
//   api: {
//     getState: () => unknown;
//     extra: unknown;
//     endpoint: string;
//     type: "query" | "mutation";
//     forced: boolean | undefined;
//   }
// ) => Headers | void;
