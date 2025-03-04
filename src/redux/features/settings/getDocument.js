

import { apiSlice } from "../../api/apiSlice"; 

const getDocument = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDocument: builder.query({
            query: () => `/seating/showAllDocuments`,
            providesTags: [{type: "Licence"}]
        })
    })
})

export const {useGetDocumentQuery} = getDocument;