

import { apiSlice } from "../../api/apiSlice";


const addDocument = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDocument: builder.mutation({
            query: (data) => ({
                url: `/seating/uplodeDocument`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{type: "Licence"}]
        })
    })
})

export const {useAddDocumentMutation} = addDocument;