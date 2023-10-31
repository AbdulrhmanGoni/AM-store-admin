import { TableRow, TableCell } from '@mui/material';


export default function ErrorUsersTable({ itemsCount }: { itemsCount: number }) {
    return (
        Array.from(Array(itemsCount)).map((num: number) => (
            <TableRow key={num}>
                <TableCell sx={{ p: 0, height: "57.2px" }}></TableCell>
                <TableCell sx={{ p: 0, height: "57.2px" }}></TableCell>
                <TableCell sx={{ p: 0, height: "57.2px" }}></TableCell>
                <TableCell sx={{ p: 0, height: "57.2px" }}></TableCell>
            </TableRow>
        ))
    )
}
