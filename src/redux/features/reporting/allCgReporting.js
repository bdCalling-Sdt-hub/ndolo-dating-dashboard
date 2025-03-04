import { apiSlice } from "../../api/apiSlice";


const allCgReport = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allCgReport: builder.query({
            query: (name = " ") => `/admin-reportForm/showCGReportCointroller?name=${name}`,

        })
    })
})

export const {useAllCgReportQuery} = allCgReport;