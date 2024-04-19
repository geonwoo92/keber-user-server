
import { createSlice } from '@reduxjs/toolkit';
import { SaveArticle, findAllArticles,  findArticleById, findArticlesByBoardId } from './article.service';
import { IArticle } from '../model/article.model';
import { saveArticleAPI } from './article.api';


interface ArticleState{
    json? : IArticle
    array?: Array<IArticle>

}
export const initialState:ArticleState={
    json : {} as IArticle,
    array: [] 

}

const articleThunks = [findAllArticles]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handleFulfilled =  (state: any, {payload}: any) => {
    console.log('------------------ conclusion ---------------')
    state.array = payload
    console.log(state.array)
}
const handlePending = (state: any) => {
}

const handleRejected = (state: any) => {
}

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;
        builder
        .addCase(findAllArticles.fulfilled, (state: any, {payload}: any) =>{state.array = payload}) 
        .addCase(findArticleById.fulfilled, (state: any, {payload}: any) =>{state.json = payload})
        .addCase(findArticlesByBoardId.fulfilled, (state: any, {payload}: any) =>{state.json = payload}) 
        .addCase(SaveArticle.fulfilled, (state: any, {payload}: any) =>{state.json = payload}) 
    }}) 
        

export const getAllArticles = (state: any) => {
        console.log('------------------ Before useSelector ---------------')
        console.log(JSON.stringify(state.article.array))
        return state.article.array;
    }
    
export const getArticleById = (state: any) => {
    
    return state.article.json
    ;
}
export const getArticlesByBoardId = (state: any) => {
    
    return state.article.json
    ;
}
export const getSaveArticle = (state: any) => {
    
    return state.article.json
    ;
}


export const {} = articleSlice.actions

export default articleSlice.reducer;