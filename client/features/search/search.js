import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const searchApiSlice = createApi({
    reducerPath: 'searchApi',
    //must have a name like slice
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080'}),
    // the base url that is used
    endpoints: (builder) =>({
        getUserInfo: builder.query({
            query:(user) => `users/search?q=${user}`,
            // user is almost like the payload
        })
    })
})
export const { useGetUserInfoQuery } = searchApiSlice
