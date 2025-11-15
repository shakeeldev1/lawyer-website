import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: "include",
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        userStats: builder.query({
            query: () => ({
                url: "/auth/stats",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        allUsers: builder.query({
            query: (search = "") => ({
                url: `/auth/all-users?search=${encodeURIComponent(search)}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.users.map(({ _id }) => ({ type: "Users", id: _id })),
                        { type: "Users", id: "LIST" },
                    ]
                    : [{ type: "Users", id: "LIST" }],
        }),
        updateRole: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/update-user-role/${id}`,
                method: "PUT",
                body: data,
            }),
            providesTags: ["Users"],
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "/auth/addUser",
                method: "POST",
                body: data,
            }),
            providesTags: ["Users"],
        }),


        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/delete-user/${id}`,
                method: "DELETE",
            }),
            providesTags: ["Users"],
        }),

        getAllCases: builder.query({
            query: (search = "") => ({
                url: `/secretary/cases?search=${search}`,
                method: 'GET',
            })
        })
    }),
});

export const {
    useUserStatsQuery,
    useAllUsersQuery,
    useUpdateRoleMutation,
    useAddUserMutation,
    useDeleteUserMutation,
    useGetAllCasesQuery
} = directorApi;
