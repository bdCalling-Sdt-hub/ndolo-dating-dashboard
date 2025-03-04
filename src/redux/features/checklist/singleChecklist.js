

import { apiSlice } from "../../api/apiSlice";


const singleChecklist = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        singleChecklist: builder.query({
            query: ({id , date}) => `/daily-chackList/showDailyChecklilstById/${id}?date=${date}`, 
        })
    })
})

export const  {useSingleChecklistQuery} = singleChecklist;