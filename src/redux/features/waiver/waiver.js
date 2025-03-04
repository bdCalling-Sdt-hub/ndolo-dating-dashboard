import { apiSlice } from "../../api/apiSlice";

const waiverForm = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        waiverForm: builder.query({
            query: () => `/admin-waiver/showWaiverForm`,
            providesTags: [{type: "Waiver"}]
        })
    })
})

export const {useWaiverFormQuery} = waiverForm;