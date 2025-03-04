
import { apiSlice } from "../../api/apiSlice";


const getByIdIncident = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getByIdIncident: builder.query({
            query: ({id , date}) => `/admin-reportForm/showInedentReportById/${id}?date=${date}`,

        })
    })
})

export const {useGetByIdIncidentQuery} = getByIdIncident;