import { apiSlice } from "../../api/apiSlice";

const updateWaiver = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateWaiver: builder.mutation({
            query: (data) => ({
                url: `/admin-waiver/updateWaiverForm`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [ {type: "Waiver"} ]
        })
    })
})

export const {useUpdateWaiverMutation} = updateWaiver;