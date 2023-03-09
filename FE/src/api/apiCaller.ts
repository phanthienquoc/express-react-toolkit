import axios from "axios";
const backendURL = "http://localhost:4001";

const request = (path: string, method: string, params: any) => {};

export const authRequest = (path: string, method: string, params: any) => {};

export const commonRequest = (path: string, method: string, params: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
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

export default commonRequest;
