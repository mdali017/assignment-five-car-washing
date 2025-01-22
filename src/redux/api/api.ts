// import { DeleteColumnOutlined } from "@ant-design/icons";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    // baseUrl: "https://carwashingserver.vercel.app",
  }),
  tagTypes: ["Services", "Slots", "Users"],
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
      query: ({ data }) => ({
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
    getServiceSlotAvailability: builder.query({
      query: ({ date, serviceId }) => ({
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
    updateSlotStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Auth
    getAllUser: builder.query({
      query: () => ({
        url: "/api/auth/all-users",
        method: "GET",
      }),
      providesTags: ["Users"],
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

    // Reviews
    createReview: builder.mutation({
      query: ({ data }): any => ({
        url: "/api/reviews/create-review",
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: token,
        // },
        body: data,
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/api/reviews/all-reviews",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUserRegistrationMutation,
  useGetAllUserQuery,
  useUserLoginMutation,
  useGetServiceSlotAvailabilityQuery,
  useCreateServicesMutation,
  useCreateServiceSlotMutation,
  useGetAllAvailableSlotsQuery,
  useGetAllSlotsQuery,
  useUpdateSlotStatusMutation,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} = baseApi;
