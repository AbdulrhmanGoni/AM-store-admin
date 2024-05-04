import {
    Table, Paper, TableRow, TableHead, TableContainer,
    TableBody, TableCell, Box
} from '@mui/material';
import useGetApi from '../../hooks/useGetApi';
import { nDecorator, P } from '@abdulrhmangoni/am-store-library';
import AvatarCell from './AvatarCell';
import UsersTableLoadingState from './UsersTableLoadingState';
import ErrorUsersTable from './ErrorUsersTable';


interface UserDataType {
    totalOrders: number,
    totalSpending: number,
    userData: {
        userEmail: string,
        avatar: string,
        userName: string
    }
}

export default function TopUsers() {

    const queryKey = "top-customers", path = `statistics?queryKey=${queryKey}&limit=5`;
    const {
        data: usersList,
        isFetching: isLoading,
        isError,
        refetch
    } = useGetApi<UserDataType[]>({ path, key: [queryKey] })

    const displayTableAlert = !isLoading && (isError || !usersList?.length);

    return (
        <Paper className='flex-column full-width full-height'>
            <Box className="flex-row-center-start gap1" sx={{ p: 1.5, height: "56.5px" }}>
                <img src='/icons/stars.svg' style={{ width: "35px", height: "35px" }} />
                <P variant="h6">Top Customers</P>
            </Box>
            <TableContainer
                sx={{
                    width: "100%",
                    bgcolor: "background.default",
                    border: "rgb(22 31 64) solid 5px",
                    borderTop: "0px"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "75px" }}>Avatar</TableCell>
                            <TableCell sx={{ minWidth: "160px" }}>User Name</TableCell>
                            <TableCell sx={{ minWidth: "180px" }}>User Email</TableCell>
                            <TableCell sx={{ width: "75px" }}>Orders</TableCell>
                            <TableCell sx={{ width: "100px", textWrap: "nowrap" }}>Spending $</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <UsersTableLoadingState itemsCount={5} addAnotherCell hideEmailState /> :
                                usersList?.map(({ userData: { userName, userEmail, avatar }, totalOrders, totalSpending }, index: number) => (
                                    <TableRow key={index}>
                                        <AvatarCell avatar={avatar} />
                                        <TableCell>{userName}</TableCell>
                                        <TableCell>{userEmail}</TableCell>
                                        <TableCell>{nDecorator(totalOrders)}</TableCell>
                                        <TableCell>${nDecorator(totalSpending.toFixed(2))}</TableCell>
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
        </Paper>
    );
}