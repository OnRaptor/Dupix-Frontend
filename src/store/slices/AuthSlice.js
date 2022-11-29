import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: {token:null, timestamp:null},
}


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setToken: (state, action) => {
            const timestamp: Date = action.payload.timestamp
            const currentDate = new Date()

            if (timestamp.getHours() > currentDate.getHours())
                return
            if (timestamp.getMinutes() - currentDate.getMinutes() > 15)
                return

            state.token = action.payload
        }
    }
})

export const { setToken } = AuthSlice.actions

export default AuthSlice.reducer