"use client"
import { IUser } from "@/app/component/users/model/user.model"
import { findUserById } from "@/app/component/users/service/user.service"
import { getUserById } from "@/app/component/users/service/user.slice"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function UserDetailPage({ params }: any) {

  const dispatch = useDispatch()
  const user: IUser = useSelector(getUserById)



  useEffect(() => {
    dispatch(findUserById(params.id))
  }, [])



  return (<>
    <h2>사용자 상세페이지</h2>
    
    <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}> {params.id} </Typography>
    <span>이름</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}> {user.name} </Typography>
    <span>비밀번호</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}> {user.password} </Typography>
    <span>직업</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>{user.job}  </Typography>
    <span>휴대폰</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>{user.phone}  </Typography>


    <button>수정</button>
    <button>탈퇴</button>

  </>)

}