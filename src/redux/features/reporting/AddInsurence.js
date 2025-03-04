

import { apiSlice } from "../../api/apiSlice";


const addInsurenc = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addInsurenc: builder.mutation({
            query: (data) => ({
                url: `/admin-insidentForm/makeInsuranceForm`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {useAddInsurencMutation} = addInsurenc;
