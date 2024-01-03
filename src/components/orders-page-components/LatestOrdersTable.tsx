import { Paper, useMediaQuery, LinearProgress } from '@mui/material';
import { DataGrid, GridRowsProp, useGridApiRef } from '@mui/x-data-grid';
import columns from './OrdersGridColumnsConfig';
import { IllustrationCard } from '@abdulrhmangoni/am-store-library';
import useGetApi from '../../hooks/useGetApi';

interface LatestOrdersType {
    totalPrice: number,
    products: string[],
    state: string,
    expectedDeliveryDate: string,
    deliveryPrice: number,
    createdAt: string,
    userData: GridRowsProp
}

export default function LatestOrdersTable() {

    const paddingSpace = useMediaQuery("(min-width: 900px)") ? 35 : 19;
    const apiRef = useGridApiRef();

    const query = "latest-orders"
    const { data: orders = [], isLoading } = useGetApi<readonly LatestOrdersType[]>({
        key: [query],
        path: `orders/${query}?limit=10`
    })

    return (
        <Paper sx={{ width: `calc(100vw - ${paddingSpace}px)` }}>
            <DataGrid
                sx={{ height: "796px" }}
                apiRef={apiRef}
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