import { apiSlice } from "../../api/apiSlice";


const getInsurenceReport = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInsurenceReport: builder.query({
            query: () => `/admin-insidentForm/showInsurenceForm`,

        })
    })
})

export const {useGetInsurenceReportQuery} = getInsurenceReport;