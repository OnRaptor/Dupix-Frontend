import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {dupixApi} from "./api/DupixApi";
import authReducer from "./slices/AuthSlice";
import pageSlice from "./slices/PageSlice";

export const store = configureStore({
    reducer: {
        [dupixApi.reducerPath]: dupixApi.reducer,
        'authSlice': authReducer,
        'pageSlice': pageSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dupixApi.middleware),
})

setupListeners(store.dispatch)