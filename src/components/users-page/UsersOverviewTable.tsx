import {
    Table, Paper, TableRow, TableHead, TableContainer,
    TableBody, Avatar, Box, Typography, TableCell
} from '@mui/material';
import useUsersStatistics, { UseUsersDataType } from '../../hooks/useUsersStatistics';
import LoadingUserRow from './LoadingUserRow';
import ErrorUsersTable from './ErrorUsersTable';
import TableNavigationButton from './TableNavigationButton';
import EmailCellIcon from './EmailCellIcon';


export default function UsersOverviewTable() {

    const { usersData, isLoading, page, pageSize, navigate, isThereNextPage } = useUsersStatistics();

    return (
        <Paper>
            <TableContainer sx={{
                width: { xs: "calc(100vw - 19px)", md: "100%" },
                maxHeight: `calc(57.2px * ${pageSize + 1})`
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "75px" }}>Avatar</TableCell>
                            <TableCell sx={{ minWidth: "160px" }}>User Name</TableCell>
                            <TableCell sx={{ minWidth: "180px" }}>User Email</TableCell>
                            <TableCell sx={{ width: "75px" }}>Orders</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ p: 0 }}>
                        {
                            isLoading ?
                                <LoadingUserRow itemsCount={pageSize} /> :
                                usersData ?
                                    usersData.map(({ avatar, userName, userEmail, userOrders, isEmailVerified }: UseUsersDataType, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ p: 1 }}>
                                                <Avatar src={avatar} sx={{ width: "40px", height: "40px" }} />
                                            </TableCell>
                                            <TableCell>{userName}</TableCell>
                                            <TableCell>
                                                <EmailCellIcon isVerified={!isEmailVerified} />
                                                {userEmail}
                                            </TableCell>
                                            <TableCell>{userOrders}</TableCell>
                                        </TableRow>
                                    )) : <ErrorUsersTable itemsCount={pageSize} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                className="flex-row-center-end"
                sx={{
                    p: 1.5,
                    gap: 1.5,
                    borderTop: "solid 1px",
                    borderColor: "text.primary"
                }}
            >
                <Typography>Page: {page}</Typography>
                <TableNavigationButton {...{ isThereNextPage, page, navigate }} direction='previous' />
                <TableNavigationButton {...{ isThereNextPage, page, navigate, isLoading }} direction='next' />
            </Box>
        </Paper>
    );
}
