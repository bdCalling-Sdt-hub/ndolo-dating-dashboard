
import { apiSlice } from "../../api/apiSlice";


const allIncident = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allIncident: builder.query({
            query: (name = ' ') => `/admin-reportForm/showIncidentReport?name=${name}`,

        })
    })
})

export const {useAllIncidentQuery} = allIncident;