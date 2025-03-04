

import { apiSlice } from "../../api/apiSlice";


const idBycgreport = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        idBycgreport: builder.query({
            query: ({id, date}) => `/admin-reportForm/showCGReportById/${id}?date=${date}`,

        })
    })
})

export const {useIdBycgreportQuery} = idBycgreport;