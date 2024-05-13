import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
    isRender: false
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticle(state, action) {
            state.article = action.payload
        },
        isRender(state, action) {
            state.isRender = action.payload
        },
    },
})

export const { getArticle, isRender } = articleSlice.actions
export default articleSlice.reducer