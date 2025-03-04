import { apiSlice } from "../../api/apiSlice";


const getProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/users/self/in`,
            providesTags: [{ type: 'Settings' }]
        }),
        updatePrifile: builder.mutation({
            query: (data) => ({
                url: `/users/self/update`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [{ type: 'Settings' }]
        })
    })
})

export const { useGetProfileQuery, useUpdatePrifileMutation } = getProfile;