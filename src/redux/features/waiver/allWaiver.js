import { apiSlice } from "../../api/apiSlice";

const allWaiver = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allWaiver: builder.query({
            query: (name = " ") => `/waiver-report/showWaiverReport?name=${name}`,
            providesTags: [{type: "Waiver"}]
        })
    })
})

export const {useAllWaiverQuery} = allWaiver