import { apiSlice } from "../../api/apiSlice";


const totalStatus = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        totalStatus: builder.query({
            query: () => `/admin-dashboared/getAllListOfApp`,
            // providesTags: [{ type: 'Settings'}]
        })
    })
})

export const {useTotalStatusQuery} = totalStatus;