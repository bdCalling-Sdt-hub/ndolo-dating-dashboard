import { apiSlice } from "../../api/apiSlice";


const interest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInterest: builder.query({
            query: () => '/interests/all?sortBy=createdAt:desc',
            providesTags: ['Interest']
        }),
        addInterest: builder.mutation({
            query: (data) => ({
                url: '/interests/creeate',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Interest'],
        }),
        updateInterest: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/interests/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Interest'],
        }),
        deleteInterest: builder.mutation({
            query: (id) => ({
                url: `/interests/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Interest'],
        }),
    })
})

export const { useGetInterestQuery, useAddInterestMutation, useUpdateInterestMutation, useDeleteInterestMutation } = interest
