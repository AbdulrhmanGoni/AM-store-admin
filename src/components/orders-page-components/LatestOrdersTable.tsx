import { Paper, useMediaQuery, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IllustrationCard } from '@abdulrhmangoni/am-store-library';
import useLatestOrders from '../../hooks/useLatestOrders';

export default function LatestOrdersTable() {

    const paddingSpace = useMediaQuery("(min-width: 900px)") ? 35 : 19;

    const {
        orders,
        columns,
        isLoading
    } = useLatestOrders();

    return (
        <Paper sx={{ width: `calc(100vw - ${paddingSpace}px)` }}>
            <DataGrid
                sx={{ height: "796px" }}
                getRowId={(row) => { return row._id }}
                rows={orders}
                columns={columns}
                loading={isLoading}
                density='comfortable'
                disableColumnFilter
                hideFooterSelectedRowCount
                hideFooterPagination
                localeText={{ noRowsLabel: "No orders", noResultsOverlayLabel: 'No products found.' }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
                slots={{
                    noRowsOverlay: () => <IllustrationCard
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