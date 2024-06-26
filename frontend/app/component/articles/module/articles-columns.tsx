import { GridColDef } from '@mui/x-data-grid'
import { ArticleColumn } from '../model/article-columns'
import { Link, Typography } from '@mui/material'
import { PG } from '../../common/enums/PG'


interface CellType {
    row: ArticleColumn
}

export default function ArticleColumns(): GridColDef[] {
    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}> {row.id}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: '제목',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
                <Link href={`${PG.ARTICLE}/detail/${row.id}`} className="underline" > {row.title}</Link></Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: '내용',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {row.content}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'registerDate',
            headerName: '등록일',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {row.regDate}</Typography>
        },

        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'ModeDate',
            headerName: '수정일',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {row.modDate}</Typography>
        },
        
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'delete',
                headerName: '삭제',
                renderCell: ({row}:CellType) => <Link href={""}>  {<Typography textAlign="center" sx={{fontSize:"1.5rem"}}> 삭제 </Typography>}</Link>
                },
]

    

}