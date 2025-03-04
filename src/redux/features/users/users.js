
import { apiSlice } from "../../api/apiSlice";


const allUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: () => ({
                url: `/admin/users/all?role=user`,
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

export const { useAllUsersQuery, useBlockUserMutation } = allUsers;


