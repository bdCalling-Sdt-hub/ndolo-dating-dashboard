import { apiSlice } from "../../api/apiSlice";


const getContact = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => `/seating/showContactUs`,
            providesTags: [{ type: "Contactus" }],
        })
    })
})

export const {useGetContactQuery} = getContact;