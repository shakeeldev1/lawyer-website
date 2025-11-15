import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApi";
import userReducer from "../features/auth/authSlice";
import { directorApi } from "../features/dashboard/api/directorApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [directorApi.reducerPath]: directorApi.reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,directorApi.middleware)
})