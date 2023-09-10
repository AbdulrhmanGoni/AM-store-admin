"use client"
import { Box, LinearProgress, useMediaQuery } from '@mui/material';
import { DataGrid, GridCellParams, GridPaginationModel, GridRowParams, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import columns from '../functions/columnsCunfig';
import useGetApi from '@/hooks/useGetApi';
import useMutateApi from '@/hooks/useMutateApi';
import useProductsPagination from '../hooks/useProductsPagination';
import ToolBar from './ProducsTableToolbar';
import Footer from './ProducsTableFooter';
import { useState, useEffect } from 'react';
import useNotifications from '@/hooks/useNotifications';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';


export default function ProductsViewerTable() {

    const paddingSpace = useMediaQuery("(min-width: 900px)") ? 67 : 51;

    const apiRef = useGridApiRef();
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [goingToDelete, setGoingToDelete] = useState<GridRowSelectionModel>([]);
    const [tablesMassages, setTablesMassages] = useState<string>("No products");

    const { bySteps, promised } = useNotifications();
    const { data: productsLength, isError } = useGetApi({ key: ["products-length"], path: "products/pagination/length" });
    const { mutateAsync: updateProduct } = useMutateApi({ key: ["edit-product"], path: "admin/products?type=update-product" });
    const { mutateAsync: deleteProduct } = useMutateApi({ key: ["delete-product"], path: "admin/products" });

    const {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
    } = useProductsPagination({ productsLength })

    function deleteProducs() {
        setGoingToDelete(selectedRows)
        promised(deleteProduct({ method: "delete", body: { productsIds: selectedRows } }),
            {
                loadingMsg: "Going to delete",
                successgMsg: "Deleting done successfully",
                errorMsg: "Deleting failed!"
            }
        ).then(res => {
            if (res) {
                selectedRows.forEach(id => {
                    apiRef.current.updateRows([{ _id: id, _action: "delete" }])
                })
            }
        })
            .catch(() => { })
            .finally(() => { setGoingToDelete([]) })
    }

    function cancelChanges(id: string, field: string, originalValue) {
        setTimeout(() => { apiRef.current.updateRows([{ _id: id, [field]: originalValue }]) }, 1)
    }

    function updateCell(params: GridCellParams, event) {
        const
            isEnter = event.type === "keydown" && event.code === "Enter",
            newValue = event.target?.value,
            field = params.field,
            productId = params.row._id,
            isChanged = newValue && newValue !== params.value

        if (isEnter) {
            if (isChanged) {
                const { update } = bySteps("Loading")
                updateProduct({ body: { productId, change: { field, newValue } } })
                    .then(res => { res && update("success", `Product's ${field} updated successfully`) })
                    .catch(() => {
                        cancelChanges(productId, field, params.value);
                        update("error", `Product's ${field} Failed to update`)
                    })
            }
        } else {
            cancelChanges(productId, field, params.value);
        }
    }

    useEffect(() => {
        isError && setTablesMassages("Failed to fetch products")
    }, [productsLength])

    return (
        <Box sx={{ width: `calc(100vw - ${paddingSpace}px)` }}>
            <DataGrid
                sx={{ height: paginationModel.pageSize < 10 ? "auto" : "814px" }}
                apiRef={apiRef}
                getRowId={(row) => { return row._id }}
                rows={products}
                columns={columns}
                rowCount={productsLength}
                loading={isLoading}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[20]}
                paginationMode='client'
                density='comfortable'
                checkboxSelection
                disableColumnFilter
                hideFooterSelectedRowCount
                isRowSelectable={(params: GridRowParams) => !goingToDelete.includes(params.row._id)}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
                onCellEditStop={updateCell}
                onPaginationModelChange={(model: GridPaginationModel) => { setPaginationModel(model); }}
                localeText={{ noRowsLabel: tablesMassages, noResultsOverlayLabel: 'No products found.' }}
                slotProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
                slots={{
                    toolbar: () => <ToolBar />,
                    footer: () => <Footer delelteFun={deleteProducs} selectedRows={selectedRows} />,
                    noRowsOverlay: () => <ErrorThrower
                        title='No Products'
                        message='There is error hapends when products fetching'
                        disableHeight
                        illustratorType="empty"
                    />,
                    loadingOverlay: LinearProgress,
                }}
            />
        </Box>
    );
}