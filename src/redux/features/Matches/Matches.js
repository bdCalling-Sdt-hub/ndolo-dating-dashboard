import { apiSlice } from "../../api/apiSlice";


const matches = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => '/matches/all?sortBy=createdAt:desc',
            providesTags: ['Matches']
        }),
        addMatches: builder.mutation({
            query: (data) => ({
                url: '/matches/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Matches']
        }),
        updateMatches: builder.mutation({
            query: ({formData , id}) => ({
                url: `/matches/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Matches']
        }),
        deleteMatches: builder.mutation({
            query: (id) => ({
                url: `/matches/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Matches']
        }),
    })
})

export const { useGetMatchesQuery, useAddMatchesMutation, useUpdateMatchesMutation  , useDeleteMatchesMutation} = matches