import { apiSlice } from "../../api/apiSlice";

const detailsWaiver = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        detailsWaiver: builder.query({
            query: ({id , date}) => `/waiver-report/showReportById/${id}?date=${date}`,
        }),
      
    })
    
})

export const {useDetailsWaiverQuery} = detailsWaiver