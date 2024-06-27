import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    form: {},
}

const formDetailSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        getFormDetail(state, action){
            state.form = action.payload
        }
    },
})


export const { getFormDetail } = formDetailSlice.actions
export default formDetailSlice.reducer