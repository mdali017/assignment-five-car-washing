import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://carwashingserver.vercel.app",
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/api/services",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    userRegistration: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useUserRegistrationMutation,
  useUserLoginMutation,
} = baseApi;
