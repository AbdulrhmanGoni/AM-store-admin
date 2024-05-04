import {
    Table, Paper, TableRow, TableHead, TableContainer,
    TableBody, Box, TableCell
} from '@mui/material';
import useUsersOverview from '../../hooks/useUsersOverview';
import UsersTableLoadingState from './UsersTableLoadingState';
import ErrorUsersTable from './ErrorUsersTable';
import TableNavigationButton from './TableNavigationButton';
import EmailCellIcon from './EmailCellIcon';
import AvatarCell from './AvatarCell';
import { P } from '@abdulrhmangoni/am-store-library';


export default function UsersOverviewTable() {

    const {
        usersData,
        isLoading,
        isError,
        refetch,
        page,
        pageSize,
        navigate,
        isThereNextPage
    } = useUsersOverview();

    const displayTableAlert = !isLoading && (isError || !usersData?.length);

    return (
        <Paper className='flex-column full-width full-height'>
            <TableContainer sx={{ width: "100%", flex: displayTableAlert ? undefined : 1 }}>
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
                                <UsersTableLoadingState itemsCount={pageSize} /> :
                                usersData?.map(({ avatar, userName, userEmail, userOrders, hisEmailVerified }, index: number) => (
                                    <TableRow key={index}>
                                        <AvatarCell avatar={avatar} />
                                        <TableCell>{userName}</TableCell>
                                        <TableCell>
                                            <P variant='body2' className='flex-row-center-start'>
                                                <EmailCellIcon isVerified={hisEmailVerified} />
                                                {userEmail}
                                            </P>
                                        </TableCell>
                                        <TableCell>{userOrders}</TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                displayTableAlert &&
                <ErrorUsersTable isError={isError} refetch={isError ? refetch : undefined} />
            }
            <Box
                className="flex-row-center-end"
                sx={{ p: 1.5, gap: 1.5 }}
            >
                <P>Page: {page}</P>
                <TableNavigationButton {...{ isThereNextPage, page, navigate }} direction='previous' />
                <TableNavigationButton {...{ isThereNextPage, page, navigate, isLoading }} direction='next' />
            </Box>
        </Paper>
    );
}
