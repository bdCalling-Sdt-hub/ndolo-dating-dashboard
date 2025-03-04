

import { apiSlice } from "../../api/apiSlice";


const deleteDocument = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteDocument: builder.mutation({
            query: (id) => ({
                url: `/seating/deleteDocument?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Licence"}]
        })
    })
})

export const {useDeleteDocumentMutation} = deleteDocument;