import { configureStore } from '@reduxjs/toolkit'
import articleDetailSlice from '../articleDetailSlice'

export const store = configureStore({
    reducer: {
        article: articleDetailSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>

