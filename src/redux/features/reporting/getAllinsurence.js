import { apiSlice } from "../../api/apiSlice";


const getAllInsurence = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllInsurence: builder.query({
            query: (name = ' ') => `/admin-reportForm/showInsurancReport?name=${name}`,
        })
    })
})

export const {useGetAllInsurenceQuery} = getAllInsurence;