import { apiSlice } from "../../api/apiSlice";

const updateInsurance = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateInsurance: builder.mutation({
      query: (formData) => ({
        url: `/admin-insidentForm/updateInsuranceForm`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateInsuranceMutation } = updateInsurance;
