
import { apiSlice } from "../../api/apiSlice";


const allAdmins = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allAdmins: builder.query({
            query: () => ({
                url: `/admin/users/all?role=admin`,
                method: "GET",
            }),
            providesTags: [{ type: "Admin" }]
        }),
        blockAdmin: builder.mutation({
            query: (id) => ({
                url: `/admin/block/${id}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Admin" }]
        }),
        addAdmins: builder.mutation({
            query: (data) => ({
                url: "/admin/sub-admin/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Admin" }]
        })
    })
})

export const { useAllAdminsQuery, useBlockAdminMutation, useAddAdminsMutation } = allAdmins;


