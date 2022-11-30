import {createSlice} from "@reduxjs/toolkit";
import {useGenTokenQuery} from "../api/DupixApi";

const initialState = {
    token: localStorage.getItem("token") || null,
}


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setToken } = AuthSlice.actions

export default AuthSlice.reducer