import { apiSlice } from "../../api/apiSlice";

const deleteEquipment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteEquipment: builder.mutation({
            query: (id) => ({
                url: `/admin-equipment/deleteEquipment/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: [{ type: "Equipment" }],
        })
    }),
})

export const {useDeleteEquipmentMutation} = deleteEquipment;