import { GridColDef, GridValueGetterParams as GVGP, GridRenderCellParams } from '@mui/x-data-grid';
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { Avatar, Chip, Typography } from '@mui/material';
import SimplePopper from '@/components/SimplePopper';

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
function renderCopyCell(params: GridRenderCellParams) {
    return (
        <SimplePopper thePopper='Copied id'>
            <Chip
                clickable
                onClick={() => { navigator.clipboard.write(params.row._id) }}
                sx={{ color: "white" }}
                label="Copy ID"
                variant="filled"
                color="primary"
            />
        </SimplePopper>
    )
}
function renderProductsCell(params: GridRenderCellParams) {
    let count = params.row.products.length
    return <Typography>{count === 1 ? "One product" : count + " Products"}</Typography>
}
function renderTotalCell(params: GridRenderCellParams) {
    let total = params.row.totalPrice.after
    return <Typography>${(nDecorator(total))}</Typography>
}
function renderDeleviryCell(params: GridRenderCellParams) {
    let { value } = params.row.deliveryPrice
    return <Typography>{value === "Free" ? "Free" : "$" + value}</Typography>
}
function renderUserEmailCell(params: GridRenderCellParams) {
    return params.row.userData.userEmail
}

const columns: GridColDef[] = [
    rowProps('userAvatar', 'User', 75, false, false, false, { renderCell: renderImageCell }),
    rowProps('totalPrice', 'Total', 110, false, false, false, { renderCell: renderTotalCell }),
    rowProps('userEmail', 'User Email', 200, false, false, false, { renderCell: renderUserEmailCell }),
    rowProps('_id', 'Order ID', 130, false, false, false, { renderCell: renderCopyCell }),
    rowProps('products', 'Products', 110, false, false, false, { renderCell: renderProductsCell }),
    rowProps('deliveryPrice', 'Delivery Price', 130, false, false, false, { renderCell: renderDeleviryCell }),
    rowProps('state', 'State', 130, false, false, false, { renderCell: renderStateCell }),
    rowProps('createdAt', 'Date', 170, false, false, false),
    rowProps('deliveryDate', 'Delivery Date', 170, false, false, false),
];

export default columns 