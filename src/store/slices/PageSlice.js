import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    _page:1,
    photos: []
}

export const PageSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        syncPage: (state, action) => {
            state.page = state._page
        },
        addPhotos: (state, action) => {
            state.photos = [...state.photos, ...action.payload]
            state._page += 1
        }
    }
})

export const { syncPage, addPhotos } = PageSlice.actions

export default PageSlice.reducer