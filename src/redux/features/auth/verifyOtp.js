import { apiSlice } from "../../api/apiSlice";


const verifyOtp2 = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verifyOtp2: builder.mutation({
            query: (value) => ({
                url: `/auth/verify-email`,
                method: "POST",
                body: value
            })
        })
    })
})

export const { useVerifyOtp2Mutation } = verifyOtp2;