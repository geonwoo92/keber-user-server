"use client"
import { IArticle } from "@/app/component/articles/model/article.model"
import { DeleteArticleById, UpdateArticleById, findArticleById } from "@/app/component/articles/service/article.service"
import { getArticleById } from "@/app/component/articles/service/article.slice"
import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function ArticleDetailPage({params}:any){
    
    
    const router = useRouter();
    const [title,Settitle] = useState('')
    const [content,Setcontent] = useState('')
    const handleonTitle = (e:any)=>{
        Settitle(e.target.value)
    }
    const handleonContent = (e:any)=>{
        Setcontent(e.target.value)
    }
    const dispatch = useDispatch()
    const article = useSelector(getArticleById)

    useEffect(()=>(dispatch(findArticleById(params.id))),[])

    const DeleteonClick = ((e:any)=>(dispatch(DeleteArticleById(params.id))))
    const UpdateonClick = (()=>(dispatch(UpdateArticleById({title,content}))))
    
    
   

   return(<>
   
    <span>ID</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}> {params.id} </Typography>
    <span>writerID</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{article.writerId} </Typography>
    <span>boardID</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}> {article.boardId} </Typography>
    <span>Title</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{article.title}  </Typography>
    <span>content</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{article.content}  </Typography>
    <span>등록일</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{article.regDate}  </Typography>
    <span>수정일</span><Typography textAlign="center" sx={{fontSize:"1.5rem"}}> {article.modDate} </Typography>
  
    <h3> Update</h3>
    <label htmlFor="title">제목<b></b></label>
    <input type="text"onChange={handleonTitle} placeholder="Enter title" name="title" required /><br />
    <label htmlFor="title">내용<b></b></label>
    <input type="text"onChange={handleonContent} placeholder="Enter title" name="title" required /><br />
    <Button  onClick={UpdateonClick}>수정</Button ><br />
    <Button  onClick={DeleteonClick}>삭제</Button ><br />
    </>)
}

