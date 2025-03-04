import { apiSlice } from "../../api/apiSlice";


const forgotPassword = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (value) => ({
                url: `/auth/forgot-password`,
                method: "POST",
                body: value
            })
        })
    })
})

export const { useForgotPasswordMutation } = forgotPassword;