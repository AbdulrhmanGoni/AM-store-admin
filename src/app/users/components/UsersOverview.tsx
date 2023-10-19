"use client"
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Table, Paper, TableRow, TableHead, TableContainer, TableBody, Avatar
} from '@mui/material';
import useUsersStatistics, { UseUsersDataType } from '@/hooks/useUsersStatistics';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UsersOverview() {

    const { usersData, isLoading, isError } = useUsersStatistics();

    return (
        <TableContainer component={Paper} sx={{ width: { xs: "calc(100vw - 19px)", md: "100%" } }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: "75px" }}>Avatar</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: "160px" }}>User Name</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: "180px" }}>User Email</StyledTableCell>
                        <StyledTableCell sx={{ width: "75px" }}>Orders</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData?.map(({ avatar, userName, userEmail, userOrders }: UseUsersDataType, index: number) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell sx={{ p: 1 }}>
                                <Avatar src={avatar} sx={{ width: "40px", height: "40px" }} />
                            </StyledTableCell>
                            <StyledTableCell>{userName}</StyledTableCell>
                            <StyledTableCell>{userEmail}</StyledTableCell>
                            <StyledTableCell>{userOrders}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}