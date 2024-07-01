import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    form: {
        id: 0,
        classification: '',
        formName: '',
        formDescription: '',
        formContent: '',
        formNumber: '',
        isItem: '',
        itemsData: [],
        fileId: '',
        username: '',
        status: 0,
        createDate: '',
    },
}

const formDetailSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        getFormDetail(state, action) {
            state.form = action.payload
        }
    },
})


export const { getFormDetail } = formDetailSlice.actions
export default formDetailSlice.reducer