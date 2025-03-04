import { apiSlice } from "../../api/apiSlice";


const signleCustomer = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signleCustomer: builder.query({
            query: ({id , date}) => ({
                url: `/customer-menifest/showCustomerManifestById/${id}?date=${date}`
            }),
            invalidatesTags: [{ type : "Manifest" }]
        })
    })
})


export const {useSignleCustomerQuery} = signleCustomer;