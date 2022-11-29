import {createApi, fetchBaseQuery} from  "@reduxjs/toolkit/dist/query/react";

export const GenTokenResult = {
    haveAlready: 0,
    invalidCred: 1,
    serverError: 2,
}

export const dupixApi = createApi({
    reducerPath: 'dupixArt',
    baseQuery: fetchBaseQuery({
            baseUrl: 'https://dupix.art/api/',
            /*fetchFn: async input => {
                const result = await fetch(new Request(input, {mode: "no-cors"}))
                console.log(result)
                return result
            }*/
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
                if (response === "you must be logged in to generate tokens!")
                    return GenTokenResult.invalidCred
                else if (response === "you already have one!")
                    return GenTokenResult.haveAlready
                else if (response === "error\" / \"unknown error" || response === "unable to generate token, session error")
                    return GenTokenResult.serverError
                else
                    return response
            },
            transformErrorResponse: (response) => {
                console.log(response.error)
                return response.error
            }
        })
    })
})

export const { useGenTokenQuery } = dupixApi