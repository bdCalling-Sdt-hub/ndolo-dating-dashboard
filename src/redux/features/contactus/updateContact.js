import { apiSlice } from "../../api/apiSlice";



const updateContact = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateContact: builder.mutation({
            query: (data) => ({
                url: `/seating/updateContact`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [{ type: "Contactus" }],
        })
    })
})

export const {useUpdateContactMutation} = updateContact;