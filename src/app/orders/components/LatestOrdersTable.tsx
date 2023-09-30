"use client"
import { Paper, useMediaQuery, LinearProgress } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import columns from '../functions/OrdersGridColumnsConfig';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import useOrdersInfinateScroll from '../hook/useOrdersInfinateScroll';


export default function LatestOrdersTable() {

    const paddingSpace = useMediaQuery("(min-width: 900px)") ? 35 : 19;
    const apiRef = useGridApiRef();

    const {
        orders,
        isLoading
    } = useOrdersInfinateScroll();

    return (
        <Paper sx={{ width: `calc(100vw - ${paddingSpace}px)` }}>
            <DataGrid
                sx={{ height: "796px" }}
                apiRef={apiRef}
                getRowId={(row) => { return row._id }}
                rows={orders || []}
                columns={columns}
                loading={isLoading}
                density='comfortable'
                disableColumnFilter
                hideFooterSelectedRowCount
                hideFooterPagination
                localeText={{ noRowsLabel: "No orders", noResultsOverlayLabel: 'No products found.' }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
                slots={{
                    noRowsOverlay: () => <ErrorThrower
                        title='No Orders'
                        message='There is error hapends when orders fetching'
                        disableHeight
                        illustratorType="empty"
                    />,
                    loadingOverlay: LinearProgress
                }}
            />
        </Paper>
    );
}