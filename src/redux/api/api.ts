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
    getSlotAvailability: builder.query({
      query: ({
        date,
        serviceId,
      }: {
        date: string;
        serviceId: string | null;
      }) => ({
        url: "/api/slots/availability",
        method: "GET",
        params: { date, serviceId },
      }),
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: "GET",
      }),
    }),
    createServices: builder.mutation({
      query: ({ data, token }) => ({
        url: "/api/services",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: data,
      }),
    }),
    createServiceSlot: builder.mutation({
      query: ({ data, token }): any => ({
        url: "/api/services/slots",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: data,
      }),
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
  useGetSlotAvailabilityQuery,
  useCreateServicesMutation,
  useCreateServiceSlotMutation
} = baseApi;
