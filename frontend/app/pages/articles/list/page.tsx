'use client'

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllArticles } from "@/app/component/articles/service/article.service";
import { getAllArticles } from "@/app/component/articles/service/article.slice";
import MoveButton from "@/app/atoms/button/MoveButton";
import { PG } from "@/app/component/common/enums/PG";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArticleColumns from "@/app/component/articles/module/articles-columns";


const ArticlesPage: NextPage = ({ data }: any) => {
  const dispatch = useDispatch()

  const allArticles: [] = useSelector(getAllArticles)

  if (allArticles !== undefined) {
    console.log('allArticles is not undefined')

    console.log('length is ' + allArticles.length)
    for (let i = 0; i < allArticles.length; i++) {
      console.log(JSON.stringify(allArticles[i]))
    }
  } else {
    console.log('allArticles is undefined')
  }

  useEffect(() => {
    dispatch(findAllArticles(1))
  }, [])

  return (<>
    <h2>Article List</h2>

    <Box sx={{ height: 400, width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticleColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>


    <h1>
      <thead>
        <tr>
          <td colSpan={3}>
            <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`} />
          </td>
        </tr>
      </thead>
    </h1>


  </>)
}

export default ArticlesPage