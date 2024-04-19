"use client"
import MoveButton from "@/app/atoms/button/MoveButton";
import ArticleColumns from "@/app/component/articles/module/articles-columns";
import { findArticlesByBoardId } from "@/app/component/articles/service/article.service";
import { getArticlesByBoardId } from "@/app/component/articles/service/article.slice";
import { PG } from "@/app/component/common/enums/PG";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function BoardList({params}:any) {


  const dispatch = useDispatch()

  const boardlist: [] = useSelector(getArticlesByBoardId)
  
  useEffect(() => {
    dispatch(findArticlesByBoardId(params.id))

  }, [])



  return (<>

    <h2>게시글 내용</h2>
    <div style={{ height: 400, width: "100%" }}>
      {boardlist && <DataGrid //
        rows={boardlist}
        columns={ArticleColumns()}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />}

    </div>
    <MoveButton text={'글쓰기'} path={`${PG.ARTICLE}/save`} />
  </>


  )


}