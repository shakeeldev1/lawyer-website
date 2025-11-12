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
        }),
        verifyAccount: builder.mutation({
            query: ({ otp, email }) => ({
                url: "/verify-otp",
                method: 'POST',
                body: { otp, email }
            })
        }),
        myProfile: builder.query({
            query: () => ({
                url: "/my-profile",
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, useSignupMutation, useVerifyAccountMutation,useMyProfileQuery } = authApi;