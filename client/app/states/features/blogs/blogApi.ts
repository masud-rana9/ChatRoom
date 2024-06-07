import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (filterOptions) => ({
        url: `/blogs${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getMyBlogs: builder.query({
      query: () => ({
        url: `/my-blogs`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
    }),

    addBlog: builder.mutation({
      query: (BlogData) => ({
        url: "/blog",
        method: "POST",
        body: BlogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    updatedBlog: builder.mutation({
      query: (updatedData) => ({
        url: `/blog/${updatedData.id}`,
        method: "PUT",
        body: updatedData.BlogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetMyBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdatedBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;

