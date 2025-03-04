import { apiSlice } from "../../api/apiSlice";


const getAbout = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAbout: builder.query({
            query: () => `/info/about-us`,
            method: "GET",
            providesTags: [{ type: "About" }]
        })
    })
})

export const { useGetAboutQuery } = getAbout;
