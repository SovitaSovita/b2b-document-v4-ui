import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
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
        }
    },
})


export const { getArticle, getFavorite, isFavorite } = articleSlice.actions
export default articleSlice.reducer