"use client"
import { Box, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import useUsersPageData from './hooks/useUsersPageData';
import columns from './functions/UsersGridColumnsConfig';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { pageSpaces } from '../page';
import PageTitle from '@/components/PageTitle';
import { Groups } from '@mui/icons-material';


export default function UsersPage() {

    const {
        usersData,
        usersDataAreLoading,
        tableRef
    } = useUsersPageData()

    return (
        <Box>
            <PageTitle
                title='Users Management'
                description='View users information and statistics'
                icon={<Groups />}
            />
            <Box sx={{ display: "flex", gap: pageSpaces }}>
                <Paper sx={{ width: { xs: "auto", md: "fit-content" } }}>
                    <DataGrid
                        sx={{ height: "796px" }}
                        apiRef={tableRef}
                        getRowId={(row) => { return row._id }}
                        rows={usersData || []}
                        columns={columns}
                        loading={usersDataAreLoading}
                        density='comfortable'
                        disableColumnFilter
                        hideFooterSelectedRowCount
                        hideFooterPagination
                        localeText={{ noRowsLabel: "No orders", noResultsOverlayLabel: 'No products found.' }}
                        slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
                        slots={{
                            noRowsOverlay: () => <ErrorThrower
                                title='No Users'
                                message='There is error hapends when orders fetching'
                                disableHeight
                                illustratorType="empty"
                            />
                        }}
                    />
                </Paper>
                <Box sx={{ display: "flex", gap: pageSpaces }}>
                    <Paper sx={{ width: "100%", height: "300px" }}></Paper>
                    <Paper sx={{ width: "100%", height: "300px" }}></Paper>
                </Box>
                P</Box>
        </Box>
    )
}