import { GridColDef, GridValueGetterParams as GVGP } from '@mui/x-data-grid';
import { numbersDecorator } from 'goni-functions';
import { Rating } from '@mui/material';
import Image from 'next/image';

type n = number
type s = string
type b = boolean

function numberField(params: GVGP, field: string, floats?: number): string {
    let value = params.row[field]?.toFixed(floats ?? 2)
    return numbersDecorator(value ?? 0)
}
const ProductImage = ({ src }) => {
    return <Image width={80} height={80} src={src} alt='product img' style={{ width: "100%", height: "97%" }} />
}
const rowProps = (field: s, headerName: s, width: n, sortable: b, editable: b, isNumber: b, moreProps?: any) => {
    const floats: number = !!["sold", "amount"][field] ? 0 : 2
    return {
        field, headerName: headerName, width, sortable,
        editable, ...moreProps, align: "left", headerAlign: "left",
        valueGetter: isNumber ? (params: GVGP) => numberField(params, field, floats) : undefined,
    }
}

const columns: GridColDef[] = [
    rowProps('images', 'Image', 130, false, false, false,
        { renderCell: (params) => <ProductImage src={params.row.images?.[0]} /> }),
    rowProps('_id', 'ID', 70, false, false, false),
    rowProps('title', 'Title', 130, false, true, false),
    rowProps('series', 'Series', 130, false, true, false),
    rowProps('category', 'Category', 120, false, true, false),
    rowProps('price', 'Price ($)', 100, true, false, true),
    rowProps('rate', 'Rate', 160, true, false, false,
        {
            renderCell: (params) => <Rating name={params.row.title} precision={0.5} value={+String(params.row.price)[0]} readOnly />
        }),
    rowProps('sold', 'Sold', 80, true, false, true),
    rowProps('amount', 'Quantity', 80, true, false, true),
    rowProps('earnings', 'Earnings', 130, true, false, true),
    rowProps('description', 'Description', 360, false, true, false),
];

export default columns 