import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth',
        credentials: "include",
    }),

    endpoints: (builder) => ({
        userStats: builder.query({
            query: () => ({
                url: "/stats",
                method: "GET",
            }),
        }),
    }),

});

export const { useUserStatsQuery } = directorApi;
