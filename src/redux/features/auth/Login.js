import { apiSlice } from "../../api/apiSlice";

const adminLogin = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (loginData) => ({
                url: `/auth/login`,
                method: "POST",
                body: loginData
            })
        })
    })
})

export const { useAdminLoginMutation } = adminLogin;
