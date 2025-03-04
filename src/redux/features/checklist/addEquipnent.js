import { apiSlice } from "../../api/apiSlice";


const addEquipment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEquipment: builder.mutation({
            query: (data) => ({
                url: `/admin-equipment/createEquipment`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [{ type: "Equipment" }],
        })
    }),
})

export const {useAddEquipmentMutation} = addEquipment;