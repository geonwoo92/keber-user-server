'use client'
import { AttachFile, FmdGood, ThumbUpAlt } from '@mui/icons-material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { MyTypography } from '@/app/component/common/style/cell';
import router from 'next/router';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSaveArticle } from '@/app/component/articles/service/article.slice';
import { IArticle } from '@/app/component/articles/model/article.model';


export default function WriterArticlesPage() {
  const [article, setArticle] = useState({} as IArticle)
  const router = useRouter();

  const dispatch = useDispatch()
  const articles = useSelector(getSaveArticle)
  const [content, setconTent] = useState("")

  const selectHandler = (e: any) => {

    setconTent(e.target.value)
  }
  const handleonContent = (e: any) => {
    setArticle({
      ...article,
      content: e.target.value
    })
  }
  const handleonId = (e: any) => {
    setArticle({
      ...article,
      boardId: e.target.value
    })
  }
  useEffect(() => { }, [])

  const handelCancel = (e: any) => {
    router.push('/pages/boards/list')
  }

  const handleSubmit = () => {
  }

  useEffect(() => {
    if (articles.message === 'SUCCESS') {
      router.push(`/pages/articles/search/${article.boardId}`)
    } else {
      console.log('save FAIL')
      console.log(articles.message)
    }
  }, [articles])
  const Options = [
    { id: 1, title: "review", content: "리뷰게시판" },
    { id: 2, title: "qna", content: "Q&A" }, 
    { id: 3, title: "free", content: "자유게시판" }

  ]

  const handleInsert = () => { }

  return (<>


    <br /><br /> <form className="max-w-sm mx-auto">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select 게시판</label>
      <select onChange={selectHandler} id="BOARDID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {
      
      Options.map((item,index)=>(
      <option key={item.id} title={item.title}> {item.content} </option>))
    
      
    
      } 
      </select>
    </form><br /><br />



    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('새글 작성', "1.5rem")}
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text" name="title" onChange={handleInsert} />
      <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here" name="content" onChange={handleInsert}></textarea>
      {/* <!-- icons --> */}
      <div className="icons flex text-gray-500 m-2">
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <ThumbUpAltIcon component={ThumbUpAlt}></ThumbUpAltIcon>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <FmdGoodIcon component={FmdGood}></FmdGoodIcon>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <AttachFileIcon component={AttachFile}></AttachFileIcon>
        </svg>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>
      {/* <!-- buttons --> */}
      <div className="buttons flex">
        <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={handelCancel}> 취소 </div>
        <div className="btn  overflow-hidden relative w-30 bg-blue-500 text-white p-3 px-8 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={handleSubmit}> 전송 </div>
      </div>
    </div>
  </>)
}

