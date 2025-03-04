import { apiSlice } from "../../api/apiSlice";

const editmanifest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editmanifest: builder.mutation({
            query: (data) => ({
                url : `/admin-manifest/updateManifest`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: [{ type : "Manifest" }]
        })
    })
})


export const {useEditmanifestMutation} = editmanifest;