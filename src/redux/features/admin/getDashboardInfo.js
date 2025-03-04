
import { apiSlice } from "../../api/apiSlice";


const allDashboardInfo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allDashboardInfo: builder.query({
            query: () => ({
                url: `/admin/dashboard/status`,
                method: "GET",
            })
        })
    })
})

export const { useAllDashboardInfoQuery } = allDashboardInfo;


