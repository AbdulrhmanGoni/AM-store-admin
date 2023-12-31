import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridPaginationModel, GridRowParams } from '@mui/x-data-grid';
import columns from './ProductsGridColumnsConfig';
import ToolBar from './ProducsTableToolbar';
import Footer from './ProducsTableFooter';
import { IllustrationCard } from '@abdulrhmangoni/am-store-library';
import useProductsTableLogic, { UpdateCelEvent } from '../../hooks/useProductsTableLogic';
import useProductsDisplayer from '../../hooks/useProductsDisplayer';


export default function ProductsViewerTable() {

    const { display } = useProductsDisplayer()
    const {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
        updateCell,
        deleteProducs,
        tablesMassages,
        goingToDelete,
        apiRef,
        productsLength,
        selectedRows,
        setSelectedRows
    } = useProductsTableLogic();

    return (
        <Box>
            <DataGrid
                sx={{ height: paginationModel.pageSize < 10 ? "auto" : "814px" }}
                apiRef={apiRef}
                getRowId={(row) => row._id}
                rows={products}
                columns={columns}
                rowCount={productsLength}
                loading={isLoading}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[20]}
                paginationMode='client'
                density='comfortable'
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
                onPaginationModelChange={(model: GridPaginationModel) => { setPaginationModel(model); }}
                localeText={{ noRowsLabel: tablesMassages, noResultsOverlayLabel: 'No products found.' }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
                slots={{
                    toolbar: () => <ToolBar />,
                    footer: () => <Footer delelteFun={deleteProducs} selectedRows={selectedRows} tableApiRef={apiRef} />,
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