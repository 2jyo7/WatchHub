import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WatchType } from '../types';

// Define a service using a base URL and expected endpoints
export const WatchApi = createApi({
  reducerPath: 'WatchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200/api/v1/' }),
  tagTypes: ['Watch'],
  endpoints: (builder) => ({
    getWatch: builder.query<WatchType[], any>({
      query: () => '', // Adjust endpoint as necessary
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Watch' as const, id })), { type: 'Watch', id: 'LIST' }]
          : [{ type: 'Watch', id: 'LIST' }],
    }),

    getWatchById: builder.query<WatchType, string>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Watch', id }],
    }),

    createWatch: builder.mutation<WatchType, Partial<WatchType>>({
      query: (newWatch) => ({
        url: 'createWatch',
        method: 'POST',
        body: newWatch,
      }),
      invalidatesTags: [{ type: 'Watch', id: 'LIST' }], // Invalidate list to force refetch
    }),

    updateWatch: builder.mutation<WatchType, any & { id: string }>({
      query: ({ id, ...updatedWatch }) => ({
        url: `updateWatch/${id}`,
        method: 'PUT',
        body: updatedWatch, 
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Watch', id }, { type: 'Watch', id: 'LIST' }], // Invalidate specific and list
    }),

    deleteWatch: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `deleteWatch/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Watch', id },
        { type: 'Watch', id: 'LIST' }, // Invalidate list to force refetch
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetWatchQuery,
  useGetWatchByIdQuery,
  useCreateWatchMutation,
  useDeleteWatchMutation,
  useUpdateWatchMutation,
} = WatchApi;
