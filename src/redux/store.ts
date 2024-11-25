import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { authApi } from "./query/auth.query";
import { usersApi } from "./query/users.query";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
