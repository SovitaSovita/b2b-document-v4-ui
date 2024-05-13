import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
    isReder: false
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticle(state, action) {
            state.article = action.payload
        },
        isReder(state, action) {
            state.isReder = action.payload
        },
    },
})

export const { getArticle, isReder } = articleSlice.actions
export default articleSlice.reducer