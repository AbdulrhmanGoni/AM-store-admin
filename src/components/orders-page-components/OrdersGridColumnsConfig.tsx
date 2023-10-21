import { JSX } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { nDecorator, timeAgo } from "@abdulrhmangoni/am-store-library";
import { Avatar, Box, Chip, Tooltip, Typography, IconButton } from '@mui/material';
import SimplePopper from '../SimplePopper';
import { CopyAll } from '@mui/icons-material';


type RowProps = [string, string, number, ((params: GridRenderCellParams) => JSX.Element) | undefined]
const rowProps = (props: RowProps): GridColDef => {
    const [field, headerName, width, renderCell] = props
    return {
        field,
        headerName,
        width,
        sortable: false,
        editable: false,
        renderCell,
        align: "left",
        headerAlign: "left"
    }
}
function renderImageCell(params: GridRenderCellParams) {
    return <Avatar src={params.row.userData.avatar} />
}
function renderStateCell(params: GridRenderCellParams) {
    return <Chip sx={{ color: "white" }} label={params.row.state} variant="filled" color="success" />
}
function renderIdCell(params: GridRenderCellParams) {
    const id = params.row._id
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: .5 }}>
            <SimplePopper
                thePopper={id}
                onClick={() => { console.log(id); navigator.clipboard.writeText(id) }}
            >
                <IconButton>
                    <CopyAll sx={{ cursor: "copy" }} />
                </IconButton>
            </SimplePopper>
            <Typography variant='body2'>{id}</Typography>
        </Box>
    )
}
function renderProductsCell(params: GridRenderCellParams) {
    const count = params.row.products.length
    return <Typography variant='body2'>{count === 1 ? "One product" : count + " Products"}</Typography>
}
function renderTotalCell(params: GridRenderCellParams) {
    const total: number = params.row.totalPrice.after
    return <Typography variant='body2'>${(nDecorator(total.toFixed(2)))}</Typography>
}
function renderDeleviryCell(params: GridRenderCellParams) {
    const { value } = params.row.deliveryPrice
    const renderValue = value === "Free" ? "Free" : "$" + value
    return <Typography
        sx={{ color: value === "Free" ? "success.main" : undefined }}
        variant='body2'>
        {renderValue}
    </Typography>
}
function renderUserEmailCell(params: GridRenderCellParams) {
    return <Typography variant='body2'>{params.row.userData.userEmail}</Typography>
}
function renderDateCell(params: GridRenderCellParams) {
    const date = params.row.createdAt;
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
    rowProps(['createdAt', 'Date', 170, renderDateCell]),
    rowProps(['totalPrice', 'Total', 110, renderTotalCell]),
    rowProps(['state', 'State', 130, renderStateCell]),
    rowProps(['products', 'Products', 110, renderProductsCell]),
    rowProps(['_id', 'Order ID', 130, renderIdCell]),
    rowProps(['userAvatar', 'User', 65, renderImageCell]),
    rowProps(['userEmail', 'User Email', 240, renderUserEmailCell]),
    rowProps(['deliveryPrice', 'Delivery Price', 130, renderDeleviryCell]),
    rowProps(['deliveryDate', 'Delivery Date', 170, undefined]),
];

export default columns 