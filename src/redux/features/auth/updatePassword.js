import { apiSlice } from "../../api/apiSlice";


const updatePasswordAdmin = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatePasswordAdmin: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: "POST",
                body: data
            })
        })
    })
})

export const { useUpdatePasswordAdminMutation } = updatePasswordAdmin; 