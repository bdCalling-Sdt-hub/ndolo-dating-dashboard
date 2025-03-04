import { apiSlice } from "../../api/apiSlice";


const allEquipment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allEquipment: builder.query({
            query: () => `/admin-equipment/showAllEquipment`,
            providesTags: [{ type: "Equipment" }],
        })
    })
})

export const {useAllEquipmentQuery} = allEquipment;