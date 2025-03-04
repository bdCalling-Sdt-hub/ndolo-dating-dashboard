import { apiSlice } from "../../api/apiSlice";


const addLiceneCartificate = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLiceneCartificate: builder.mutation({
            query: (data) => ({
                url: `/seating/createLicence`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{type: "Licence"}]
        })
    })
})

export const {useAddLiceneCartificateMutation} = addLiceneCartificate;