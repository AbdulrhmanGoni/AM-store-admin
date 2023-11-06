import {
    Table, Paper, TableRow, TableHead, TableContainer,
    TableBody, Box, Typography, TableCell
} from '@mui/material';
import useUsersOverview from '../../hooks/useUsersOverview';
import LoadingUserRow from './LoadingUserRow';
import ErrorUsersTable from './ErrorUsersTable';
import TableNavigationButton from './TableNavigationButton';
import EmailCellIcon from './EmailCellIcon';
import AvatarCell from './AvatarCell';


export default function UsersOverviewTable() {

    const { usersData, isLoading, page, pageSize, navigate, isThereNextPage } = useUsersOverview();

    return (
        <Paper sx={{ width: "100%", height: "100%" }}>
            <TableContainer sx={{ width: "100%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "75px" }}>Avatar</TableCell>
                            <TableCell sx={{ minWidth: "160px" }}>User Name</TableCell>
                            <TableCell sx={{ minWidth: "180px" }}>User Email</TableCell>
                            <TableCell sx={{ width: "75px" }}>Orders</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <LoadingUserRow itemsCount={pageSize} /> :
                                usersData ?
                                    usersData.map(({ avatar, userName, userEmail, userOrders, hisEmailVerified }, index: number) => (
                                        <TableRow key={index}>
                                            <AvatarCell avatar={avatar} />
                                            <TableCell>{userName}</TableCell>
                                            <TableCell>
                                                <Typography variant='body2' className='flex-row-center-start'>
                                                    <EmailCellIcon isVerified={hisEmailVerified} />
                                                    {userEmail}
                                                </Typography>
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
                    gap: 1.5
                }}
            >
                <Typography>Page: {page}</Typography>
                <TableNavigationButton {...{ isThereNextPage, page, navigate }} direction='previous' />
                <TableNavigationButton {...{ isThereNextPage, page, navigate, isLoading }} direction='next' />
            </Box>
        </Paper>
    );
}
