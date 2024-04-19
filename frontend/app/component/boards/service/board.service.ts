import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllBoardsAPI, findBoardByIdAPI } from "./board.api";



export const findAllBoards: any =createAsyncThunk('boards/findAllBoards',
async(page:number, {rejectWithValue})=>{
    console.log('findAllBoards page:'+ page)
    
    const data:any = await findAllBoardsAPI(page);

        const {message, result}:any = data
        // console.log('----- API 를 사용한 경우 -----')
        // console.log('message : '+ message)
        // console.log(JSON.stringify(result))
        return data
}
)

export const findBoardById: any =createAsyncThunk('boards/findBoardById',
async(id:number, {rejectWithValue})=>{
    
    
    const data:any = await findBoardByIdAPI(id);
    const {message, result}:any = Date

    
        return data
}
)