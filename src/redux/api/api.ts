import { DeleteColumnOutlined } from "@ant-design/icons";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    // baseUrl: "https://carwashingserver.vercel.app",
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    // Services
    getAllServices: builder.query({
      query: () => ({
        url: "/api/services",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    createServices: builder.mutation({
      query: ({ data, token }) => ({
        url: "/api/services",
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: token,
        // },
        body: data,
      }),
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: "GET",
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),

    // Slots
    getAllSlots: builder.query({
      query: () => ({
        url: "/api/all-slots",
        method: "GET",
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
    getAllAvailableSlots: builder.query({
      query: ({ payload }) => ({
        url: "/api/slots/availability",
        method: "GET",
        params: {
          date: payload.date,
          serviceId: payload.serviceId,
        },
      }),
    }),

    // Auth
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
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUserRegistrationMutation,
  useUserLoginMutation,
  useGetSlotAvailabilityQuery,
  useCreateServicesMutation,
  useCreateServiceSlotMutation,
  useGetAllAvailableSlotsQuery,
  useGetAllSlotsQuery,
} = baseApi;
