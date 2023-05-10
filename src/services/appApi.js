import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
require('dotenv').config();
//define a service using base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  `${process.env.REACT_APP_SERVER_URL}`
    }),
    endpoints: (builder) => ({
        //creating a user
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
        }),

        //login
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // logout
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi

export default appApi;