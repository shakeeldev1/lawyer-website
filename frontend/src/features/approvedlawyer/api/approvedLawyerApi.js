import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const approvedLawyerApi = createApi({
    reducerPath: 'approvedLawyerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/lawyer`,
        credentials: "include",
    }),
    tagTypes: ['Cases'],

    endpoints: (builder) => ({
        // GET: Pending Approvals
        pendingApprovals: builder.query({
            query: () => ({
                url: `/pending-approvals`,
                method: 'GET',
            }),
            providesTags: ['Cases'],
        }),

    }),
});

export const {
    usePendingApprovalsQuery
} = approvedLawyerApi;
