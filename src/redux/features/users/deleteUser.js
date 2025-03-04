
import { apiSlice } from "../../api/apiSlice";
import { toast } from "react-toastify";

const allUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/delete/${id}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "User" }, { type: "Admin" }]
        })
    })
})

export const { useDeleteUserMutation } = allUsers;


