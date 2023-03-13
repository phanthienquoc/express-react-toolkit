import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import qrApi from "../services/qr";
import userApi from "../services/user";
import notificationApi from "../services/notification";
import connectedDeviceApi from "../services/connectedDevice";

import authReducer from "../features/auth";
import userReducer from "../features/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [qrApi.reducerPath]: qrApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [connectedDeviceApi.reducerPath]: connectedDeviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = [userApi, notificationApi, qrApi, connectedDeviceApi].map((item) => item.middleware);
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares);
  },
});
setupListeners(store.dispatch);

// export const persistor = persistStore(store);
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
