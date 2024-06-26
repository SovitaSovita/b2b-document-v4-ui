import { configureStore } from '@reduxjs/toolkit'
import articleDetailSlice from '../articleDetailSlice'
import formDetailSlice from '../formDetailSlice'

export const store = configureStore({
    reducer: {
        article: articleDetailSlice,
        favorite: articleDetailSlice,
        form: formDetailSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

