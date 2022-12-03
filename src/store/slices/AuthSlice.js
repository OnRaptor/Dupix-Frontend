import {createSlice} from "@reduxjs/toolkit";
import {useGenTokenQuery} from "../api/DupixApi";

const initialState = {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("login") || ''
}


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthData: (state, action) => {
            state.token = action.payload.token
            if (action.payload.login)
                state.username = action.payload.login
        }
    }
})

export const { setAuthData } = AuthSlice.actions

export default AuthSlice.reducer