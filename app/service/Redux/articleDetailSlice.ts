import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticle(state, action) {
            state.article = action.payload
        },
        // getArticleFavorite(state, action) {
        //     state.article = action.payload
        // }
    },
})

// Favorite
const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        getFavorite(state, action) {
            state.favorite = action.payload
        }
    }
})

export const { getArticle, } = articleSlice.actions
export default articleSlice.reducer