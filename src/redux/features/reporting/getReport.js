import { apiSlice } from "../../api/apiSlice";


const getReport = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReport: builder.query({
            query: () => `/admin-insidentForm/showCgForm`,

        })
    })
})

export const {useGetReportQuery} = getReport;