import { apiSlice } from "../../api/apiSlice";


const getById = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getById: builder.query({
            query: (id) => ({
               url:   `/admin-equipment/getEquipmentById/${id}`,
               method: "GET"
               
            })
        })
    })
})

export const {useGetByIdQuery} = getById;