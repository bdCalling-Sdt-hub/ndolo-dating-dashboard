import { apiSlice } from "../../api/apiSlice";


const editEquipment = apiSlice.injectEndpoints({
    endpoints: (builder)=>  ({
        editEquipment: builder.mutation({
            query: (data) => ({
                url: `/admin-equipment/updateEquipment`,
                method: "PATCH",
                body: data
                
            }),
            invalidatesTags: [{ type: "Equipment" }],
        })
    })
})

export const {useEditEquipmentMutation} = editEquipment;

 
