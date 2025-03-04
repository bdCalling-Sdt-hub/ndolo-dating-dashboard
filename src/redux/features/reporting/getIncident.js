import { apiSlice } from "../../api/apiSlice";


const getIncident = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIncident: builder.query({
            query: () => `/admin-insidentForm/showinsidentForm`,

        })
    })
})

export const {useGetIncidentQuery} = getIncident;