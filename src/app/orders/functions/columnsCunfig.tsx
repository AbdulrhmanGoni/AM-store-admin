import { GridColDef, GridValueGetterParams as GVGP, GridRenderCellParams } from '@mui/x-data-grid';
import { nDecorator, timeAgo } from "@abdulrhmangoni/am-store-library";
import { Avatar, Box, Chip, Tooltip, Typography } from '@mui/material';
import SimplePopper from '@/components/SimplePopper';
import { CopyAll } from '@mui/icons-material';

type n = number
type s = string
type b = boolean

const rowProps = (field: s, headerName: s, width: n, sortable: b, editable: b, isNumber: b, moreProps?: any) => {
    const floats: number = ["productsCount"].includes(field) ? 0 : 2;
    return {
        field, headerName: headerName, width, sortable,
        editable, ...moreProps, align: "left", headerAlign: "left",
        valueGetter: isNumber ? (params: GVGP) => numberField(params, field, floats) : undefined,
    }
}
function numberField(params: GVGP, field: string, floats?: number): string | number {
    return nDecorator(params.row[field]?.toFixed(floats ?? 2) ?? 0)
}
function renderImageCell(params: GridRenderCellParams) {
    return <Avatar src={params.row.userData.avatar} />
}
function renderStateCell(params: GridRenderCellParams) {
    return <Chip sx={{ color: "white" }} label={params.row.state} variant="filled" color="success" />
}
function renderIdCell(params: GridRenderCellParams) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: .5 }}>
            <SimplePopper thePopper={params.row._id}>
                <CopyAll />
            </SimplePopper>
            <Typography variant='body2'>{params.row._id}</Typography>
        </Box>
    )
}
function renderProductsCell(params: GridRenderCellParams) {
    let count = params.row.products.length
    return <Typography variant='body2'>{count === 1 ? "One product" : count + " Products"}</Typography>
}
function renderTotalCell(params: GridRenderCellParams) {
    let total = params.row.totalPrice.after
    return <Typography variant='body2'>${(nDecorator(total))}</Typography>
}
function renderDeleviryCell(params: GridRenderCellParams) {
    let { value } = params.row.deliveryPrice
    return <Typography variant='body2'>{value === "Free" ? "Free" : "$" + value}</Typography>
}
function renderUserEmailCell(params: GridRenderCellParams) {
    return <Typography variant='body2'>{params.row.userData.userEmail}</Typography>
}
function renderDateCell(params: GridRenderCellParams) {
    let date = params.row.createdAt;
    return (
        <Tooltip title={date}>
            <Box>
                <Typography variant='body2'>{timeAgo(date)}</Typography>
                <Typography variant='body2'>{date.slice(0, 19)}</Typography>
            </Box>
        </Tooltip>
    )
}

const columns: GridColDef[] = [
    rowProps('createdAt', 'Date', 170, false, false, false, { renderCell: renderDateCell }),
    rowProps('totalPrice', 'Total', 110, false, false, false, { renderCell: renderTotalCell }),
    rowProps('state', 'State', 130, false, false, false, { renderCell: renderStateCell }),
    rowProps('products', 'Products', 110, false, false, false, { renderCell: renderProductsCell }),
    rowProps('_id', 'Order ID', 130, false, false, false, { renderCell: renderIdCell }),
    rowProps('userAvatar', 'User', 65, false, false, false, { renderCell: renderImageCell }),
    rowProps('userEmail', 'User Email', 240, false, false, false, { renderCell: renderUserEmailCell }),
    rowProps('deliveryPrice', 'Delivery Price', 130, false, false, false, { renderCell: renderDeleviryCell }),
    rowProps('deliveryDate', 'Delivery Date', 170, false, false, false),
];

export default columns 