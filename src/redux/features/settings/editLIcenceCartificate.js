 
import { apiSlice } from "../../api/apiSlice"; 


const editLiceneCartificate = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editLiceneCartificate: builder.mutation({
            query: (data) => ({
                url: `/seating/updateLicence`,
                method: "PATCH",
                body : data
            }),
            invalidatesTags: [{type: "Licence"}]
        })
    })
})

export const {useEditLiceneCartificateMutation} = editLiceneCartificate;