import { MoveUpRounded } from "@mui/icons-material"
import LinkButton from "./LinkButton"

import {useRouter} from "next/navigation"
import { text } from "stream/consumers"

interface IMoveButton {

    text: string,
    path: string
}


export default function MoveButton({text,path}:IMoveButton) {
    const router = useRouter()


    return (<>

        <button 
        onClick={()=> router.push(path)}
        type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
        rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
         focus:outline-none dark:focus:ring-blue-800">{text}</button>

        
    </>





    )
}
