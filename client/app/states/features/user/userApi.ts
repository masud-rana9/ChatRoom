import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: `/profile`,
        };
      },
      providesTags: [tagTypes.user],
    }),

    editProfile: builder.mutation({
      query: (info) => {
        return {
          url: `/profile`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useEditProfileMutation,
  useDeleteUserMutation,
} = userApi;
