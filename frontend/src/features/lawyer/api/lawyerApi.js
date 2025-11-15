import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const lawyerApi = createApi({
    reducerPath: "lawyerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api`,
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        lawyerCases: builder.query({
            query: (search) => ({
                url: `/lawyer/cases?search=${encodeURIComponent(search)}`,
                method: 'GET'
            })
        })
    })
})

export const { useLawyerCasesQuery } = lawyerApi; 