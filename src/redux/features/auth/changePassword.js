 
import { apiSlice } from "../../api/apiSlice";


const cahngePassword = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cahngePassword: builder.mutation({
            query:  (data) => ({
                url: `/users/changePasswordUseingOldPassword`,
                method: "PATCH",
                body: data
            })
        })
    })
})

export const {useCahngePasswordMutation} = cahngePassword;