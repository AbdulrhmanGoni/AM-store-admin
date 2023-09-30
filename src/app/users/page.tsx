"use client"
import { Box, Grid, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import useUsersPageData from './hooks/useUsersPageData';
import columns from './functions/UsersGridColumnsConfig';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { pageSpaces } from '../page';


export default function UsersPage() {

    const {
        usersData,
        usersDataAreLoading,
        tableRef
    } = useUsersPageData()

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant='h5'>Users Management</Typography>
                <Typography>View users information and statistics</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: pageSpaces }}>
                <Paper sx={{ width: { xs: "auto", sm: 510 } }}>
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
                <Grid container spacing={pageSpaces}>
                    <Grid item sm={6}><Paper sx={{ width: "100%", height: "300px" }}></Paper></Grid>
                    <Grid item sm={6}><Paper sx={{ width: "100%", height: "300px" }}></Paper></Grid>
                </Grid>
            </Box>
        </Box>
    )
}