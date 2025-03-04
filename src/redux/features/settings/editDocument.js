
import { apiSlice } from "../../api/apiSlice";


const editDocument = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editDocument: builder.mutation({
            query: ({ documentId, data }) => ({
                url: `/seating/updateDocument?documentId=${documentId}`,
                method: "PATCH",
                body: data,  
            }),
            invalidatesTags: [{ type: "Licence" }],
        }),
    }),
});

export const { useEditDocumentMutation } = editDocument;


  