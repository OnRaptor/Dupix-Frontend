import {dupixApi} from "./DupixApi";
import {setAuthData} from "../slices/AuthSlice";
import {GenTokenErrorResult, GetDataErrorResult} from "./DupixApiGeneric";

export const DupixApiUtils = {
    cacheAuth: (login?, password?, token?, isAuth = '1') =>{
        localStorage.setItem("isAuth", isAuth)
        login && localStorage.setItem("login", login)
        password && localStorage.setItem("password", password)
        token && localStorage.setItem("token", token)
    },
    getCachedData: () =>{
        return {
            isAuth: localStorage.getItem("isAuth"),
            login: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
            token: localStorage.getItem("token")
        }
    },
    regenToken: async (dispatch, fetchMethod) => {
        console.log('regen token...')
        const {login, password} = DupixApiUtils.getCachedData()
        const response = await dispatch(dupixApi.endpoints.genToken.initiate([login, password]))
        console.log(response.data)
        if (response.data !== GenTokenErrorResult.haveAlready) {
            dispatch(setAuthData({token:response.data}))
            DupixApiUtils.cacheAuth(null, null, response.data)
            return fetchMethod()
        }
        else
            return GenTokenErrorResult.haveAlready
    },
    transformServerOutput: async (response, dispatch, fetchMethod) =>{
        let output
        if (response === "invalid arguments")
            output = GetDataErrorResult.invalidArgs
        else if (response === "invalid token"){
            await DupixApiUtils.regenToken(dispatch, fetchMethod)
            output = await fetchMethod()
        }
        else if (response.includes('critical error'))
            output = GetDataErrorResult.serverError
        else
            output = response

        return output
    },
    logout: async (dispatch) => {
        await dispatch(dupixApi.endpoints.discardToken.initiate())
        DupixApiUtils.cacheAuth('','','', '0')
    }
 }

