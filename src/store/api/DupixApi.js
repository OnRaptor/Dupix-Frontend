import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    GenTokenErrorResult,
    GetDataErrorResult,
    GetDataType,
    queryFnForAction,
    queryFnWithToken
} from "./DupixApiGeneric";

export const dupixApi = createApi({
    reducerPath: 'dupixArt',
    baseQuery: fetchBaseQuery({
            baseUrl: 'https://dupix.art/api/',
            }),
    endpoints: (builder) => ({
        genToken:  builder.query({
            query: (arg) =>  {
                const [login, password] = arg;
                return {
                    url: 'genToken.php',
                    params: { username:login, password:password },
                    responseHandler: "text"
                };
            },
            transformResponse: (response) =>{
                console.log(response)
                console.log(typeof response)
                if (response === "you must be logged in to generate tokens!")
                    return GenTokenErrorResult.invalidCred
                else if (response === "you already have one!")
                    return GenTokenErrorResult.haveAlready
                else if (response === "error\" / \"unknown error" || response === "unable to generate token, session error")
                    return GenTokenErrorResult.serverError
                else
                    return response
            }
        }),
        getGenericData: builder.query({
            queryFn: queryFnWithToken
        }),
        makeAction: builder.query({
            queryFn: queryFnForAction
        }),
        getProfileData: builder.query({
            queryFn: async (args,
                {signal, dispatch, getState},
                extraOptions,
                fetchBQ) =>{
                const token = getState().authSlice.token
                const response = await fetchBQ({
                    url: `getByToken.php`,
                    params: {token: token},
                    responseHandler: "text"
                })
                console.log(response)
                if (response === "unable to get user info by token")
                    return { data: GetDataErrorResult.invalidToken }
                else
                    return { data: JSON.parse(response) }
            }
        })
    })
})

export const { useGenTokenQuery, useGetGenericDataQuery, useGetProfileDataQuery } = dupixApi