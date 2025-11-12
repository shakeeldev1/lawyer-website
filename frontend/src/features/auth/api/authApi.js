import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth',
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;