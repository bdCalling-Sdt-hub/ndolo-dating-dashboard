import { apiSlice } from "../../api/apiSlice";

const updateCgReport = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateCgReport: builder.mutation({
      query: (formData) => ({
        url: `/admin-insidentForm/updateCgForm`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateCgReportMutation } = updateCgReport;
