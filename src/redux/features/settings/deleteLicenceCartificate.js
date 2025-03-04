import { apiSlice } from "../../api/apiSlice";


const deleteLicenceCartificate = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteLicenceCartificate: builder.mutation({
            query: (id) => ({
                url: `/seating/deleteLicence?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Licence"}]
        })
    })
})

export const {useDeleteLicenceCartificateMutation} = deleteLicenceCartificate;