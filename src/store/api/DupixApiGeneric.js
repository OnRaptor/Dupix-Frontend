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
    endOfData: 3,
}

export const GetDataType = {
    Recs: 'getRecs',
    Legends: 'getPhotos',
    Fresh: 'getPhotos-fresh'
}

//useGetGenericDataQuery(GetDataType.Recs)
export const queryFnWithToken = async (args,
                                {signal, dispatch, getState},
                                extraOptions,
                                fetchBQ) => {
    const fetchFn = async () => {
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
        //Success
        if (response.data.startsWith('{')) {
            const json = JSON.parse(response.data)
            console.log(json)
            if (json.photos.length === 0)
                return {data: GetDataErrorResult.endOfData}
            return { data: json }
        }
        console.log(response.data)
        return { error: true, data:response.data }
    }

    const res = await fetchFn()
    console.log(res)
    if (res.error)
        return DupixApiUtils.transformServerOutput(res.data, dispatch, fetchFn)
    else
        return res
}

export const queryFnForAction = async (args,
                                {signal, dispatch, getState},
                                extraOptions,
                                fetchBQ) => {
    const fetchFn = () => {
        const token = getState().authSlice.token
        if (token === null)
            return GetDataErrorResult.invalidToken
        let [query, initParams] = args
        return fetchBQ(
            {
                url: `${query}.php`,
                params: {...initParams, token: token},
                responseHandler: "text"
            }
        )
    }
    const response = await fetchFn()
    console.log("Response:")
    console.log(response)

    if (response.data.includes("true"))
        return {data: true}
    else //Error handle
        return DupixApiUtils.transformServerOutput(response.data, dispatch, fetchFn)
}
