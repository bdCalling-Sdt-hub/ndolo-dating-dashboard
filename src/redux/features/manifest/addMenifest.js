import { apiSlice } from "../../api/apiSlice";


const addMenifest = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        addMenifest: builder.mutation({
            query: (data) => ({
                url: `/admin-manifest/createManifest`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [{ type : "Manifest" }]
        })
    })
})

export const {useAddMenifestMutation} = addMenifest;