import { useState } from 'react';
import { CopyAll } from '@mui/icons-material';
import copy from '@/functions/copy';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Tooltip } from '@mui/material';

interface SmallTableProps {
    title: string,
    _id: string,
    count: number,
    price: number,
}

export default function SmallTable({ theProducts }: { theProducts: SmallTableProps[] }) {

    const [copiedTooltip, setCopiedTooltip] = useState<string>("");

    function onCopy(text: string) {
        copy(text);
        setCopiedTooltip(text + " copied");
    }

    return (
        <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Price ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {theProducts.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell component="th" >
                                <Tooltip title={copiedTooltip}>
                                    <Chip
                                        onClick={() => onCopy(product._id)}
                                        onMouseOver={() => setCopiedTooltip("")}
                                        label="Copy id"
                                        color='primary'
                                        size='small'
                                        icon={<CopyAll />}
                                        clickable
                                    />
                                </Tooltip>
                            </TableCell>
                            <TableCell component="th" scope="row">{product.title}</TableCell>
                            <TableCell align="right" width={50}>{product.count}</TableCell>
                            <TableCell align="right">
                                {(product.price * product.count).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
