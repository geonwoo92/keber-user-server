import { createSlice } from "@reduxjs/toolkit";
import { findAllBoards, findBoardById } from "./board.service";
import { IBoard } from "../model/board.model";

interface BoardState{
    json? : IBoard
    array?: Array<IBoard>

}
export const initialState:BoardState={
    json : {} as IBoard,
    array: [] 

}
const boardThunks = [findAllBoards]
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

export const boardslice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;
        builder
        .addCase(findAllBoards.fulfilled, (state: any, {payload}: any) => {state.array = payload })
        .addCase(findBoardById.fulfilled, (state: any, {payload}: any) => {state.json = payload } )
    }
})

export const getAllBoards = (state: any) => {
    console.log('------------------ Before useSelector ---------------')
    console.log(JSON.stringify(state.board.array))
    return state.board.array;
}

export const getSingleBoard = (state: any) => {
    
    return state.board.json;
}


export const {} = boardslice.actions

export default boardslice.reducer;