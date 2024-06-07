import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const roomsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: (filterOptions) => ({
        url: `/rooms${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rooms],
    }),

    getAllRooms: builder.query({
      query: () => ({
        url: `/my-rooms`,
        method: "GET",
      }),
      providesTags: [tagTypes.rooms],
    }),
    getSingleRooms: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rooms],
    }),

    addRoom: builder.mutation({
      query: (roomData) => ({
        url: "/rooms",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: [tagTypes.rooms],
    }),

    addMessage: builder.mutation({
      query: (roomData) => ({
        url: `/roomsMessage/${roomData?.id}`,
        method: "PUT",
        body: roomData?.data,
      }),
      invalidatesTags: [tagTypes.rooms],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.rooms],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useAddRoomMutation,
  useGetRoomsQuery,
  useDeleteRoomMutation,
  useGetSingleRoomsQuery,
  useAddMessageMutation,
} = roomsApi;
