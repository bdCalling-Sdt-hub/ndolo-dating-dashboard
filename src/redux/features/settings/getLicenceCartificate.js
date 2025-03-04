import { apiSlice } from "../../api/apiSlice";

 

const getLicenceCartificate = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLicenceCartificate: builder.query({
            query: () => `/seating/showAllLicencesAdmin`,
            providesTags: [{type: "Licence"}]
        })
    })
})

export const {useGetLicenceCartificateQuery} = getLicenceCartificate;