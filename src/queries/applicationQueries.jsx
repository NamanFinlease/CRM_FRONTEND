import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()
const role = () => JSON.parse(localStorage.getItem("auth-storage")).state.activeRole
// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: fetchBaseQuery({

    baseUrl: "https://api.fintechbasket.com/api", 
    // baseUrl: "http://localhost:3000/api",
    // baseUrl: "http://192.168.0.119:3000/api", 
    // 'https://crm-backend-wui1.onrender.com/api/leads'

    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },

  }),
  tagTypes: ["getApplication","getProfile","bankDetails","applicantDetails","getCamDetails","recommendedApplication"],
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name
    holdApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/hold/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile"]
    }),
    rejectApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/reject/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile","getApplication"]
    }),
    sanctionReject: builder.mutation({
      query: ({id,reason}) => ({

        url: `sanction/reject/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile","getApplication","recommendedApplication"]
    }),
    unholdApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/unhold/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile"]
    }),
    sendBack: builder.mutation({
      query: ({id,reason,sendTo}) => ({

        url: `applications/sent-back/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{sendTo,reason}
      }),
      invalidatesTags:["getApplication"]
    }),
    sanctionSendBack: builder.mutation({
      query: ({id,reason,sendTo}) => ({

        url: `sanction/sent-back/${id}/?role=${role()}`,
        method: 'PATCH',
        body:{sendTo,reason}
      }),
      invalidatesTags:["getApplication","recommendedApplication"]
    }),
    approveApplication: builder.mutation({
      query: (id) => ({

        url: `sanction/approve/${id}/?role=${role()}`,
        method: 'PATCH',
      }),
      invalidatesTags:["getApplication","recommendedApplication"]
    }),
    recommendApplication: builder.mutation({
      query: (id) => ({

        url: `applications/recommend/${id}/?role=${role()}`,
        method: 'PATCH',
      }),
    }),


    allocateApplication: builder.mutation({
      query: (id) => ({
        url: `/applications/${id}/?role=${role()}`,
        method: 'PATCH',
      }),
      invalidatesTags:["getApplication"]
    }),
    addBank: builder.mutation({
      query: ({id,data}) => ({

        url: `/verify/bank/${id}/?role=${role()}`,
        method: 'POST',
        body:data
      }),
      invalidatesTags:["getApplication","bankDetails"]
    }),
    updatePersonalDetails: builder.mutation({
      query: ({id,updates}) => ({

        url: `/applicant/${id}/?role=${role()}`,
        method: 'PATCH',
        body:updates
      }),
      invalidatesTags:["getApplication","applicantDetails"]
    }),
    fetchAllApplication: builder.query({
      query: ({ page, limit }) => `/applications/?page=${page}&limit=${limit}&role=${role()}`,
      providesTags:["getApplication"]
    }),
    fetchAllocatedApplication: builder.query({
      query: ({page,limit}) => `/applications/allocated/?page=${page}&limit=${limit}&role=${role()}`,
      providesTags: ["getApplication"]
    }),
    
    fetchSingleApplication: builder.query({
      query: (id) => `/applications/${id}/?role=${role()}`,
      providesTags: ["getProfile"]
    }),
    applicantPersonalDetails: builder.query({
      query: (id) => `/applicant/${id}/?role=${role()}`,
      providesTags: ["applicantDetails"]
    }),
    getBankDetails: builder.query({
      query: (id) => `/applicant/bankDetails/${id}/?role=${role()}`,
      providesTags:['bankDetails']
    }),
    allHoldApplication: builder.query({
      query: () => `/applications/hold/?role=${role()}`,
      providesTags: ["applicationHeld"]
    }),
    getCamDetails : builder.query({
      query : (id) => `/applications/cam/${id}/?role=${role()}`,
      providesTags:["getCamDetails"]
    }),
    updateCamDetails : builder.mutation({
      query: ({id,updates}) => ({

        url: `/applications/cam/${id}/?role=${role()}`,
        method: 'PATCH',
        body: {
          details: updates,  // Ensure updates is sent under the 'details' key
        },
      }),
      invalidatesTags : ['getCamDetails']
    }),
    // getLeadDocs: builder.query({
    //   query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}/?role=${role()}`,
    // }),
    // getInternalDedupe: builder.query({
    //   query: (id) => `/leads/old-history/${id}/?role=${role()}`,
    // }),
    // applicationHistory: builder.query({
    //   query: (id) => `/leads/viewleadlog/${id}/?role=${role()}`,
    // }),
    // fetchAllgetApplication: builder.query({
    //   query: () => `/leads/hold/?role=${role()}`,
    //   providesTags:["getApplication"]
    // }),
    getRejectedApplications: builder.query({
      query: () => `/applications/rejected/?role=${role()}`,
      providesTags:["getApplication"]
    }),
    recommendedApplications: builder.query({
      query: () => `/sanction/recommended/?role=${role()}`,
      providesTags:["recommendedApplicatio"]
    }),
    sanctionProfile: builder.query({
      query: (id) => `/sanction/${id}/?role=${role()}`,
      // providesTags:["getApplication"]
    }),
    sanctionPreview: builder.query({
      query: (id) => `/sanction/preview/${id}/?role=${role()}`,
      // providesTags:["getApplication"]
    }),
    
  }),
});
export const {
    useFetchAllApplicationQuery,
    useAllocateApplicationMutation,
    useHoldApplicationMutation,
    useRejectApplicationMutation,
    useSanctionRejectMutation,
    useUnholdApplicationMutation,
    useRecommendApplicationMutation,
    useAddBankMutation,
    useSendBackMutation,
    useSanctionSendBackMutation,
    useApproveApplicationMutation,
    useUpdatePersonalDetailsMutation,
    useGetBankDetailsQuery,
    useFetchAllocatedApplicationQuery,
    useFetchSingleApplicationQuery,
    useApplicantPersonalDetailsQuery,
    useAllHoldApplicationQuery,
    useGetRejectedApplicationsQuery,  
    useGetCamDetailsQuery,
    useUpdateCamDetailsMutation,
    useRecommendedApplicationsQuery,
    useSanctionProfileQuery,
    useLazySanctionPreviewQuery,

} = applicationApi;
