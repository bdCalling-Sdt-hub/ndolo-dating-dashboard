import { apiSlice } from "../../api/apiSlice";

 
 const editProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editProfile: builder.mutation({
            query: (data) => ({
                url: `/users/updatedUserProfile`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [ {type: "Settings"}]
        })
    })
 })

 export const {useEditProfileMutation} = editProfile;