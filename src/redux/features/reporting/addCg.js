import { apiSlice } from "../../api/apiSlice";


const addCgReport = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCgReport: builder.mutation({
            query: (data) => ({
                url: `/admin-insidentForm/makeCgForm`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {useAddCgReportMutation} = addCgReport;
