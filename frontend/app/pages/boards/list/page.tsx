'use client'
import CardButton from "@/app/atoms/button/CardButton"
import { IBoard } from "@/app/component/boards/model/board.model"
import { findAllBoards } from "@/app/component/boards/service/board.service"
import { getAllBoards } from "@/app/component/boards/service/board.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export default function BoardCards() {




    // const dispatch = useDispatch()
    // const allBoards = useSelector(getAllBoards)
    // useEffect(() => {

    //     dispatch(findAllBoards(1))
    // }, [])



    return (<>


        <h2>게시판 목록</h2>

        {/* {allBoards.map((board: IBoard) => (<CardButton id={board.id}  title={board.title}  description={board.description}/> ))
    } */}

    </>)


}
