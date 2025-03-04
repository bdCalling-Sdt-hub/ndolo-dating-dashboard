import { apiSlice } from "../../api/apiSlice";


const getTermCondition = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTermCondition: builder.query({
            query: () => `/info/terms-services`,
            providesTags: [{ type: "Terms" }]
        })
    })
})

export const { useGetTermConditionQuery } = getTermCondition;
