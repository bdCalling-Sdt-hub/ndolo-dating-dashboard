import { apiSlice } from "../../api/apiSlice";

const updateIncident = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateIncident: builder.mutation({
      query: (formData) => ({
        url: `/admin-insidentForm/updateIncidentForm`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateIncidentMutation } = updateIncident;
