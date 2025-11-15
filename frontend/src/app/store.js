import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApi";
import userReducer from "../features/auth/authSlice";
import { directorApi } from "../features/dashboard/api/directorApi";
import { lawyerApi } from "../features/lawyer/api/lawyerApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [directorApi.reducerPath]: directorApi.reducer,
        [lawyerApi.reducerPath]: lawyerApi.reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, directorApi.middleware, lawyerApi.middleware)
})