import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {setToken} from "../slices/AuthSlice";
import {DupixApiUtils} from "./DupixApiUtils";

export const GenTokenErrorResult = {
    haveAlready: 0,
    invalidCred: 1,
    serverError: 2,
}

export const GetDataErrorResult = {
    invalidArgs: 0,
    invalidToken: 1,
    serverError: 2,
}

export const GetDataType = {
    Recs: 'getRecs',
    Legends: 'getPhotos',
    Fresh: 'getPhotos-fresh'
}

//useGetGenericDataQuery(GetDataType.Recs)
const queryFnWithToken = async (args,
                                {signal, dispatch, getState},
                                extraOptions,
                                fetchBQ) => {
    const token = getState().authSlice.token
    if (token === null)
        return GetDataErrorResult.invalidToken
    const [type, page] = args
    const response = await fetchBQ(
        {
            url: `${type}.php`,
            params: {token: token, p: page},
            responseHandler: "text"
        }
    )
    console.log("Response:")

    if (response.data.startsWith('{')) {
        const json = JSON.parse(response.data)
        console.log(json)
        return { data: json }
    }
    else
        console.log(response.data)

    if (response.data === "invalid arguments")
        return GetDataErrorResult.invalidArgs
    else if (response.data === "invalid token"){
        console.log('regen token...')
        const {login, password} = DupixApiUtils.getCachedData()
        const response = await dispatch(dupixApi.endpoints.genToken.initiate([login, password]))
        if (response.data !== GenTokenErrorResult.haveAlready) {
            dispatch(setToken(response.data))
            DupixApiUtils.cacheAuth(null, null, response.data)
            return await fetchBQ(
                {
                    url: `${type}.php`,
                    params: {token: response.data, p: page},
                    responseHandler: "json"
                }
            )
        }
    }
    else if (response.data.includes('critical error'))
        return GetDataErrorResult.serverError
}

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
        })
    })
})

export const { useGenTokenQuery, useGetGenericDataQuery } = dupixApi