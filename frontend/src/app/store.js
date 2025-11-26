import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApi";
import userReducer from "../features/auth/authSlice";
import { directorApi } from "../features/dashboard/api/directorApi";
import { lawyerApi } from "../features/lawyer/api/lawyerApi";
import { secretaryApi } from "../features/secretary/api/secretaryApi";
import { directorReminderApi } from "../features/dashboard/api/reminderApi";
import { approvedLawyerApi } from "../features/approvedlawyer/api/approvedLawyerApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [directorApi.reducerPath]: directorApi.reducer,
    [lawyerApi.reducerPath]: lawyerApi.reducer,
    [secretaryApi.reducerPath]: secretaryApi.reducer,
    [directorReminderApi.reducerPath]: directorReminderApi.reducer,
    [approvedLawyerApi.reducerPath]: approvedLawyerApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      directorApi.middleware,
      lawyerApi.middleware,
      secretaryApi.middleware,
      directorReminderApi.middleware,
      approvedLawyerApi.middleware,
    ),
});
