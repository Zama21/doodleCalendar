import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from 'shared/api/apiInstance.js';

export const sharedApi = createApi({
    reducerPath: 'sharedApi',
    endpoints: builder => ({
        getGenres: builder.query({
            queryFn: () => axiosInstance.get('/books/genres'),
        }),
        getMySeries: builder.query({
            queryFn: () => axiosInstance.get('/books/mySeries'),
        }),
    }),
});
