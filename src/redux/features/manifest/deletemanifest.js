import { apiSlice } from "../../api/apiSlice";

const deleteManifest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteManifest: builder.mutation({
            query: (id) => ({
                url: `/admin-manifest/deleteManifest/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: [{ type : "Manifest" }]
        })
    }),
})

export const {useDeleteManifestMutation} = deleteManifest;