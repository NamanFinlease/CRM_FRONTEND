import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './BaseURL';

const role = () => JSON.parse(localStorage.getItem("auth-storage")).state.activeRole
// Define a service using a base URL and expected endpoints
export const lmsQueries = createApi({
    reducerPath: 'lmsQueries',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            return headers;
        },

    }),
    tagTypes: [
        "getApplication",
      
    ],
    endpoints: (builder) => ({

        activeLeads: builder.query({
            query: ({ page, limit }) => `/collections/active/?page=${page}&limit=${limit}&role=${role()}`,
        }),
    }),
});
export const {
    useActiveLeadsQuery, 

} = lmsQueries;
