import { GridColDef, GridRenderCellParams as GRCP, GridValueGetterParams as GVGP } from '@mui/x-data-grid';
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { Avatar, Rating } from '@mui/material';
import sortProductsViewerTable from './sortProductsViewerTable';


type n = number
type s = string
type b = boolean
type PropsWithOptions = [s, s, n, b, b, b, ((params: GRCP) => JSX.Element) | undefined, number | undefined]
const rowConfig = (props: [s, s, n, b, b, b] | PropsWithOptions): GridColDef => {
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
        valueGetter: isNumber && field != "rate" ? (params: GVGP) => numberField(params, field, floats) : undefined,
        sortComparator: isNumber || field == "rate" ? sortProductsViewerTable : () => 0
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
    rowConfig(['images', 'Image', 130, false, false, false, renderImageCell, undefined]),
    rowConfig(['_id', 'ID', 70, false, false, false]),
    rowConfig(['title', 'Title', 130, false, true, false]),
    rowConfig(['series', 'Series', 130, false, true, false]),
    rowConfig(['category', 'Category', 120, false, false, false]),
    rowConfig(['price', 'Price ($)', 100, true, false, true]),
    rowConfig(['rate', 'Rate', 160, true, false, true, renderRateCell, undefined]),
    rowConfig(['sold', 'Sold', 80, true, false, true]),
    rowConfig(['amount', 'Quantity', 80, true, false, true]),
    rowConfig(['earnings', 'Earnings ($)', 130, true, false, true]),
    rowConfig(['description', 'Description', 360, false, true, false, undefined, 1])
];

export default columns 