
import { apiSlice } from "../../api/apiSlice";


const allUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: ({ page, limit }) => ({
                url: `/admin/users/all?role=user&page=${page}&limit=${limit}&sortBy=createdAt:desc`,
                method: "GET",
            }),
            providesTags: [{ type: "User" }]
        }),
        allUsersDis: builder.query({
            query: () => ({
                url: `/admin/users/all?role=user&sortBy=createdAt:desc`,
                method: "GET",
            }),
            providesTags: [{ type: "User" }]
        }),
        blockUser: builder.mutation({
            query: (id) => ({
                url: `/admin/block/${id}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "User" }]
        })
    })
})

export const { useAllUsersQuery, useBlockUserMutation, useAllUsersDisQuery } = allUsers;


