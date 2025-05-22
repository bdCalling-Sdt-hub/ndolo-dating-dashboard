import { apiSlice } from "../../api/apiSlice";

const getChildSafetyPolicy = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChildSafetyPolicy: builder.query({
            query: () => `/info/child-safety-policy`,
            providesTags: [{ type: "ChildSafety" }]
        }),
        editChildSafteyPolicy: builder.mutation({
            query: (data) => ({
                url: `/info/child-safety-policy`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "ChildSafety" }]
        })
    })
})



export const { useGetChildSafetyPolicyQuery, useEditChildSafteyPolicyMutation } = getChildSafetyPolicy;