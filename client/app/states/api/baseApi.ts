import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypesList";
import { RootState } from "../app/store";
import { config } from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,

  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
