import { Paper, useMediaQuery, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FetchFailedAlert, IllustrationCard } from '@abdulrhmangoni/am-store-library';
import useLatestOrders from '../../hooks/useLatestOrders';

export default function LatestOrdersTable() {

    const paddingSpace = useMediaQuery("(min-width: 900px)") ? 35 : 19;

    const {
        orders,
        columns,
        isLoading,
        isError
    } = useLatestOrders();

    return (
        <Paper sx={{ width: `calc(100vw - ${paddingSpace}px)` }}>
            <DataGrid
                sx={{ height: "796px" }}
                getRowId={(row) => row._id}
                rows={orders}
                columns={columns}
                loading={isLoading}
                density='comfortable'
                disableColumnFilter
                hideFooterSelectedRowCount
                hideFooterPagination
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 300 } } }}
                slots={{
                    noRowsOverlay: () => (
                        <IllustrationCard
                            title={isError ? "Unexpected Error" : 'No Orders'}
                            hideAlertMsg
                            disableHeight
                            illustratorType={isError ? "unexpected" : "empty"}
                            paperStyle={{ boxShadow: "none" }}
                        >
                            <>
                                {
                                    isError &&
                                    <FetchFailedAlert
                                        message='There is an error hapends when fetching orders'
                                        style={{ mx: "auto", mt: 1, width: "fit-content" }}
                                        refetch={() => { }}
                                    />
                                }
                            </>
                        </IllustrationCard>
                    ),
                    loadingOverlay: LinearProgress
                }}
            />
        </Paper>
    );
}