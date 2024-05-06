import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticle(state, action) {
            state.article = action.payload
        },
    },
})

export const { getArticle } = articleSlice.actions
export default articleSlice.reducer