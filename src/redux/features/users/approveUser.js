import { apiSlice } from "../../api/apiSlice";


const approvedUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        approvedUsers: builder.mutation({
            query: (id) => ({
                url: `/admin-userList/userAprovedByAdmin?userId=${id}`,
                method:"PATCH",
                // body: {
                //     userId : id
                // }
            }),
            invalidatesTags: [{ type: "User" }],
        })
    })
})

export const {useApprovedUsersMutation} = approvedUsers;