export const QUERY_KEY_AUTHENTICATION = {
  SIGNIN: "auth/signin",
  SIGNUP: "auth/signup",
  USER_DETAIL: "USER_DETAIL",
};

export const QUERY_KEYS = {
  USERS: {
    pathName: "user",
    apiPath: "api/user",
    reducerPath: "adminManage_USERS",
    endpoint: {
      NAME: "user",
      GET: "user/get",
      ADD: "user/add",
      UPDATE: "user/update",
      DETELE: "user/delete",
      GETALL: "user/getall",
    },
  },
  QR_CODE: {
    pathName: "qr",
    reducerPath: "adminManage_QR_CODE",
  },
  CONNECTED_DEVICES: {
    pathName: "connected-device",
    reducerPath: "adminManage_CONNECTED_DEVICES",
  },
  AUTHENTICATION: {
    SIGNIN: "auth/signin",
    SIGNUP: "auth/signup",
    USER_DETAIL: "USER_DETAIL",
  },
};

export default QUERY_KEYS;
