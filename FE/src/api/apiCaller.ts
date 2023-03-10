import axios from "axios";
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

export default commonRequest;
