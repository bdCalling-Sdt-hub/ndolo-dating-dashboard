import { apiSlice } from "../../api/apiSlice";


const updatePrivacy = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatePrivacy: builder.mutation({
            query: (content) => ({
                url: `/info/privacy-policy`,
                method: 'POST',
                body: content
            }),
            invalidatesTags: [{ type: "Settings" }]
        })
    }),

})

export const { useUpdatePrivacyMutation } = updatePrivacy;