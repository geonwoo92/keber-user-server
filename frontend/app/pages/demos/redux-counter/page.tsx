'use client'
import { Button } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSelector, useDispatch } from "react-redux"
import { NextPage } from "next";
import { getCount, minusCountHandler, plusCountHandler } from "@/app/component/counter/service/counter.slice";

const ReduxCounterPage:NextPage = () => {

    const count = useSelector(getCount)
    const dispatch = useDispatch()

    return(<div className="text-center">
        <h1>Redux Counter : {count}</h1>
        <Button onClick = {() => dispatch(plusCountHandler())}>        
            <AddCircleOutlineIcon />
        </Button>
        <Button onClick = {() => dispatch(minusCountHandler())}>
            <RemoveCircleOutlineIcon />
        </Button>
    </div>)
}

export default ReduxCounterPage