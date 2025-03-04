

import { apiSlice } from "../../api/apiSlice";


const allCustomer = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allCustomer: builder.query({
             query: (name = " ") => `/customer-menifest/showCustomerManifest?name=${name}`, 
             providesTags: [{ type: "Manifest" }],
        })
    })
})

export const {useAllCustomerQuery} = allCustomer;