import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/auth",
        credentials: "include",
    }),
    tagTypes: ["Users"], // ✅ Define tag types
    endpoints: (builder) => ({
        userStats: builder.query({
            query: () => ({
                url: "/stats",
                method: "GET",
            }),
            providesTags: ["Users"], // ✅ Tag for stats (optional)
        }),
        allUsers: builder.query({
            query: (search = "") => ({
                url: `/all-users?search=${encodeURIComponent(search)}`,
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
                url: `/update-user-role/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "/addUser",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Users", id: "LIST" }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Users", id }, { type: "Users", id: "LIST" }],
        }),
    }),
});

export const {
    useUserStatsQuery,
    useAllUsersQuery,
    useUpdateRoleMutation,
    useAddUserMutation,
    useDeleteUserMutation,
} = directorApi;
