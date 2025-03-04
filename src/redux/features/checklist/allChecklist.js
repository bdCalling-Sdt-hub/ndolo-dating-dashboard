import { apiSlice } from "../../api/apiSlice";


const allcheckList = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allcheckList: builder.query({
            query: (name = ' ') => `/daily-chackList/showAllDailyChecklilst?name=${name}`, 
        })
    })
})

export const  {useAllcheckListQuery} = allcheckList;