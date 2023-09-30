import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';


type n = number
type s = string
type b = boolean

const rowProps = (field: s, headerName: s, width: n, sortable: b, editable: b, moreProps?: any) => {
    return {
        field,
        headerName,
        width,
        sortable,
        editable,
        align: "left",
        headerAlign: "left",
        ...moreProps
    }
}
function renderImageCell(params: GridRenderCellParams) {
    return <Avatar src={params.row.avatar} />
}

const columns: GridColDef[] = [
    rowProps('avatar', 'Avatar', 60, false, false, { renderCell: renderImageCell }),
    rowProps('userName', 'User Name', 170, false, false),
    rowProps('userEmail', 'User Email', 180, false, false),
    rowProps('userOrders', 'User Orders', 90, true, false)
];

export default columns 