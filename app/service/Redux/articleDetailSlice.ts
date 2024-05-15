import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
    isRender: false,
    isFavorite: false
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticle(state, action) {
            state.article = action.payload
        },
        getFavorite(state, action) {
            state.favorite = action.payload
        },
        isFavorite(state, action) {
            console.log("action.payload >> >", action.payload)
            console.log("state.isFavorite >> >", state.isFavorite)
            state.isFavorite = action.payload
        },
        isRender(state, action) {
            state.isRender = action.payload
        },
    },
})


export const { getArticle, getFavorite, isFavorite, isRender } = articleSlice.actions
export default articleSlice.reducer