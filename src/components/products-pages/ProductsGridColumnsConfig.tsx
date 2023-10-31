import { GridColDef, GridRenderCellParams as GRCP, GridValueGetterParams as GVGP } from '@mui/x-data-grid';
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { Avatar, Rating } from '@mui/material';


type n = number
type s = string
type b = boolean
type PropsWithOptions = [s, s, n, b, b, b, ((params: GRCP) => JSX.Element) | undefined, number | undefined]
const rowProps = (props: [s, s, n, b, b, b] | PropsWithOptions): GridColDef => {
    const [field, headerName, width, sortable, editable, isNumber, renderCell, flex] = props
    const floats: number = ["sold", "amount"].includes(field) ? 0 : 2;
    return {
        field,
        headerName,
        width,
        sortable,
        editable,
        align: "left",
        headerAlign: "left",
        flex,
        renderCell,
        valueGetter: isNumber ? (params: GVGP) => numberField(params, field, floats) : undefined
    }
}

function numberField(params: GVGP, field: string, floats?: number): string | number {
    return nDecorator(params.row[field]?.toFixed(floats ?? 2) ?? 0)
}

function renderRateCell(params: GRCP) {
    return <Rating name={params.row.title} precision={0.5} value={+String(params.row.price)[0]} readOnly />
}

function renderImageCell(params: GRCP) {
    const style = { width: "100%", height: "97%", borderRadius: 0 }
    return <Avatar src={params.row.images?.[0]} alt='product img' sx={style} />
}

const columns: GridColDef[] = [
    rowProps(['images', 'Image', 130, false, false, false, renderImageCell, undefined]),
    rowProps(['_id', 'ID', 70, false, false, false]),
    rowProps(['title', 'Title', 130, false, true, false]),
    rowProps(['series', 'Series', 130, false, true, false]),
    rowProps(['category', 'Category', 120, false, true, false]),
    rowProps(['price', 'Price ($)', 100, true, false, true]),
    rowProps(['rate', 'Rate', 160, true, false, false, renderRateCell, undefined]),
    rowProps(['sold', 'Sold', 80, true, false, true]),
    rowProps(['amount', 'Quantity', 80, true, false, true]),
    rowProps(['earnings', 'Earnings ($)', 130, true, false, true]),
    rowProps(['description', 'Description', 360, false, true, false, undefined, 1])
];

export default columns 