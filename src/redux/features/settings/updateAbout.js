import { apiSlice } from "../../api/apiSlice";


const updateAbout = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAbout: builder.mutation({
            query: (data) => ({
                url: `/info/about-us`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: "About" }]
        })
    }),
})

export const { useUpdateAboutMutation } = updateAbout;
