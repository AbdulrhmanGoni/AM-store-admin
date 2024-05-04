import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import columns from './ProductsGridColumnsConfig';
import ProducsTableToolbar from './ProducsTableToolbar';
import ProducsTableFooter from './ProducsTableFooter';
import { FetchFailedAlert, IllustrationCard } from '@abdulrhmangoni/am-store-library';
import useProductsTableLogic, { UpdateCelEvent } from '../../hooks/useProductsTableLogic';
import useProductsDisplayer from '../../hooks/useProductsDisplayer';


export default function ProductsViewerTable() {

    const {
        products,
        thereIsMore,
        paginationModel,
        setPaginationModel,
        loadedPages,
        isLoading,
        isError,
        updateCell,
        deleteProducs,
        deleteProductFromTable,
        goingToDelete,
        apiRef,
        selectedRows,
        setSelectedRows
    } = useProductsTableLogic();
    const { display } = useProductsDisplayer({ onDelete: deleteProductFromTable });

    return (
        <Box>
            <DataGrid
                sx={{ height: paginationModel.pageSize < 10 ? "auto" : "814px" }}
                apiRef={apiRef}
                getRowId={(row) => row._id}
                rows={products}
                columns={columns}
                loading={isLoading}
                paginationModel={paginationModel}
                pageSizeOptions={[20]}
                density='comfortable'
                disableDensitySelector
                checkboxSelection
                onCellDoubleClick={(event) => {
                    if (event.field === "images") {
                        display(event.id as string)
                    }
                }}
                disableColumnFilter
                hideFooterSelectedRowCount
                isRowSelectable={(params: GridRowParams) => !goingToDelete.includes(params.row._id)}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
                onCellEditStop={(params, event) => { updateCell(params, event as UpdateCelEvent) }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 300 } } }}
                slots={{
                    toolbar: () => <ProducsTableToolbar />,
                    footer: () => (
                        <ProducsTableFooter
                            delelteFun={deleteProducs}
                            selectedRows={selectedRows}
                            tableApiRef={apiRef}
                            pagination={{
                                model: paginationModel,
                                setModel: setPaginationModel,
                                thereIsMore,
                                loadedPages
                            }}
                        />
                    ),
                    noRowsOverlay: () => (
                        <IllustrationCard
                            title={isError ? "Unexpected Error" : 'No Products'}
                            hideAlertMsg
                            disableHeight
                            illustratorType={isError ? "unexpected" : "empty"}
                            paperStyle={{ boxShadow: "none" }}
                        >
                            <>
                                {
                                    isError &&
                                    <FetchFailedAlert
                                        message='There is an error hapends when fetching products'
                                        style={{ mx: "auto", mt: 1, width: "fit-content" }}
                                        refetch={() => { }}
                                    />
                                }
                            </>
                        </IllustrationCard>
                    ),
                    loadingOverlay: LinearProgress,
                }}
            />
        </Box>
    );
}