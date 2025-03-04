 

import { apiSlice } from "../../api/apiSlice";


const getByIdInsurence = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getByIdInsurence: builder.query({
            query: ({id , date}) => `/admin-reportForm/showInsurenceReportById/${id}?date=${date}`,

        })
    })
})

export const {useGetByIdInsurenceQuery} = getByIdInsurence;