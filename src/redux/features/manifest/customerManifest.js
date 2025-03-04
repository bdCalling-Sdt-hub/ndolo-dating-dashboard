

 
import { apiSlice } from "../../api/apiSlice";


const customerManifest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        customerManifest: builder.query({
             query: () => `/admin-manifest/showMenifest`, 
             providesTags: [{ type: "Manifest" }],
        })
    })
})

export const {useCustomerManifestQuery} = customerManifest;