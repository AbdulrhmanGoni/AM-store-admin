import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import columns from './ProductsGridColumnsConfig';
import ProducsTableToolbar from './ProducsTableToolbar';
import ProducsTableFooter from './ProducsTableFooter';
import { IllustrationCard } from '@abdulrhmangoni/am-store-library';
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
                rowCount={products.length + 1}
                loading={isLoading}
                paginationModel={paginationModel}
                pageSizeOptions={[20]}
                paginationMode='client'
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
                localeText={{ noRowsLabel: "No products", noResultsOverlayLabel: 'No products found.' }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
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
                            title='No Products'
                            message='There is error hapends when products fetching'
                            disableHeight
                            illustratorType="empty"
                            style={{ height: "100%" }}
                        />
                    ),
                    loadingOverlay: LinearProgress,
                }}
            />
        </Box>
    );
}