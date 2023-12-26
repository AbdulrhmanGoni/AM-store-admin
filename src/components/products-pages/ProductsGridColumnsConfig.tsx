import { GridColDef, GridRenderCellParams as GRCP, GridValueGetterParams as GVGP } from '@mui/x-data-grid';
import { AlertTooltip, P, PriceDisplayer, nDecorator } from "@abdulrhmangoni/am-store-library";
import { Avatar, Box, Rating } from '@mui/material';
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

function renderRatingCell(params: GRCP) {
    const
        reviews = params.row.rating?.reviews || 0,
        ratingAverage = params.row.rating?.ratingAverage || 0

    return (
        <AlertTooltip
            type={ratingAverage ? "success" : "info"}
            title={`Average Rating (${ratingAverage}) - Reviews (${reviews})`}
            hideAlertIcon
        >
            <Box className="flex-row-center-start">
                <Rating
                    name={`rating of ${params.row._id} product`}
                    precision={0.5}
                    value={ratingAverage}
                    readOnly
                />
                <P variant='subtitle2' ml={.5}>({reviews})</P>
            </Box>
        </AlertTooltip>
    )
}

function renderImageCell(params: GRCP) {
    const style = { width: "100%", height: "97%", borderRadius: 0 }
    return <Avatar src={params.row.images?.[0]} alt='product img' sx={style} />
}

function renderPriceCell(params: GRCP) {
    return <PriceDisplayer price={params.row.price} discount={params.row.discount} />
}

const columns: GridColDef[] = [
    rowConfig(['images', 'Image', 130, false, false, false, renderImageCell, undefined]),
    rowConfig(['_id', 'ID', 70, false, false, false]),
    rowConfig(['title', 'Title', 130, false, true, false]),
    rowConfig(['series', 'Series', 130, false, true, false]),
    rowConfig(['category', 'Category', 120, false, false, false]),
    rowConfig(['price', 'Price ($)', 100, true, false, true, renderPriceCell, undefined]),
    rowConfig(['rating', 'Rating', 160, true, false, false, renderRatingCell, undefined]),
    rowConfig(['sold', 'Sold', 80, true, false, true]),
    rowConfig(['amount', 'Quantity', 80, true, false, true]),
    rowConfig(['earnings', 'Earnings ($)', 130, true, false, true]),
    rowConfig(['description', 'Description', 360, false, true, false, undefined, 1])
];

export default columns 