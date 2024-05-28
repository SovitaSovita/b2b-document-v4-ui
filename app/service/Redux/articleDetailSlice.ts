import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {},
    favorite: {},
    isRender: false,
    isFavorite: false,
    isMode: false,
    getOptionData: "",
    session: {
        clph_NO: "",
        dvsn_CD: "",
        dvsn_NM: "",
        eml: "",
        flnm: "",
        id: "",
        jbcl_NM: "",
        prfl_PHTG: "",
        token: "",
        use_intt_id: null,
        userId: ""
    }
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
            state.isFavorite = action.payload
        },
        isRender(state, action) {
            state.isRender = action.payload
        },
        getOptionData(state, action) {
            state.getOptionData = action.payload
        },
        isMode(state, action) {
            state.isMode = action.payload
        },
        get_session(state, action) {
            state.session = action.payload
        },

    },
})


export const { getArticle, getFavorite, isFavorite, isRender, getOptionData, isMode, get_session } = articleSlice.actions
export default articleSlice.reducer