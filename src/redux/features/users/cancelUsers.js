import { apiSlice } from "../../api/apiSlice";


const cancelUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
         cancelUsers : builder.mutation({
            query: (id) => ({
                url: `/admin-userList/cancelUserVerify?userId=${id}`,
                method:"PATCH",
                // body: {
                //     userId : id
                // }
            }),
            invalidatesTags: [{ type: "User" }],
        })
    })
})

export const { useCancelUsersMutation } = cancelUsers;