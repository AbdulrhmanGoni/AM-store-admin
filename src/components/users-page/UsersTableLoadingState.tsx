import { Box, Skeleton, TableRow, TableCell } from '@mui/material';


export default function UsersTableLoadingState({ itemsCount, hideEmailState }: { itemsCount: number, hideEmailState?: boolean }) {
    return (
        Array.from(Array(itemsCount)).map((_: undefined, index: number) => (
            <TableRow key={index}>
                <TableCell sx={{ p: 1, height: "57.2px" }}>
                    <Skeleton variant="circular" sx={{ width: "40px", height: "40px" }} />
                </TableCell>
                <TableCell sx={{ height: "57.2px" }}>
                    <Skeleton variant="rounded" />
                </TableCell>
                <TableCell sx={{ height: "57.2px" }}>
                    <Box className="flex-row-center" gap={1}>
                        {!hideEmailState && <Skeleton variant="circular" sx={{ width: "1em", height: "1em" }} />}
                        <Skeleton variant="rounded" sx={{ flex: 1 }} />
                    </Box>
                </TableCell>
                <TableCell sx={{ height: "57.2px" }}>
                    <Skeleton variant="rounded" />
                </TableCell>
            </TableRow>
        ))
    )
}
