import { Link, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { UserColumn } from "../model/userColumn"
import { MyTypography } from "../../common/style/cell"
import { PG } from "../../common/enums/PG"

interface CellType {
    row: UserColumn
}

export default function UsersColumns(): GridColDef[] {

    return [
        {
            flex: 0.04,
            field: 'id',
            minWidth: 30,
            headerName: 'ID',
            renderCell: ({ row }: CellType) => MyTypography(row.id, "1.2rem" )
         

        },
        {
            flex: 0.04,
            field: 'username',
            minWidth: 30,
            headerName: 'userID',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>{row.username}</Typography>
        },

        {
            flex: 0.04,
            field: 'password',
            minWidth: 30,
            headerName: '비밀번호',
            renderCell: ({ row }: CellType) => MyTypography(row.password, "1.2rem" )
        },
        {
            flex: 0.04,
            field: 'name',
            minWidth: 30,
            headerName: '이름',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>
            <Link href={`${PG.USER}/detail/${row.id}`} className="underline" > {row.name} </Link></Typography>
     
        },
        {
            flex: 0.04,
            field: 'phone',
            minWidth: 30,
            headerName: '전화번호',
            renderCell: ({ row }: CellType) => MyTypography(row.phone, "1.2rem" )
        },
        {
            flex: 0.04,
            field: 'job',
            minWidth: 30,
            headerName: '직업',
            renderCell: ({ row }: CellType) => MyTypography(row.job, "1.2rem" )
        }
    ]
}