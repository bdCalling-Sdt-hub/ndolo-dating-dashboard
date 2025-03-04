import { apiSlice } from "../../api/apiSlice";

const editService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editService: builder.mutation({
            query: (data) => ({
                url: `/admin-service/updateService`,
                method:"PATCH",
                body: data
            }),
           
            invalidatesTags : [{ type: "Service" }],
        }),

    }),
})

export const {useEditServiceMutation} = editService;