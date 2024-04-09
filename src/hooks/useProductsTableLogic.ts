import { GridCellParams, GridRowSelectionModel, useGridApiRef } from "@mui/x-data-grid";
import { useState } from "react";
import useProductsPagination from "./useProductsPagination";
import useNotifications from "./useNotifications";
import useMutateApi from "./useMutateApi";
import useProductsActions from "./useProductsActions";

export interface UpdateCelEvent {
    type: string,
    code: string,
    target: { value: string | number }
}
export default function useProductsTableLogic() {

    const apiRef = useGridApiRef();
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [goingToDelete, setGoingToDelete] = useState<GridRowSelectionModel>([]);
    const { updateProduct } = useProductsActions();

    const { bySteps, promised } = useNotifications();
    const { mutateAsync: deleteProducts } = useMutateApi({ key: ["delete-products"], path: "admin/products" });

    const {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
        thereIsMore,
        loadedPages
    } = useProductsPagination()

    function deleteProducs() {
        setGoingToDelete(selectedRows)
        promised(deleteProducts({ method: "delete", body: { productsIds: selectedRows } }),
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

    function cancelChanges(id: string, field: string, originalValue: string | number) {
        setTimeout(() => { apiRef.current.updateRows([{ _id: id, [field]: originalValue }]) }, 1)
    }

    function updateCell(params: GridCellParams, event: UpdateCelEvent) {
        const
            isEnter = event.type === "keydown" && event.code === "Enter",
            newValue = event.target?.value,
            field = params.field,
            productId = params.row._id,
            isChanged = newValue && newValue !== params.value
        if (isEnter) {
            if (isChanged) {
                const { update } = bySteps("Loading");
                updateProduct({ [field]: newValue }, productId)
                    .then(res => { res && update("success", `Product's ${field} updated successfully`) })
                    .catch(() => {
                        cancelChanges(productId, field, params.value as string);
                        update("error", `Product's ${field} Failed to update`)
                    })
            }
        } else {
            cancelChanges(productId, field, params.value as string);
        }
    }

    return {
        products,
        thereIsMore,
        paginationModel,
        setPaginationModel,
        loadedPages,
        isLoading,
        updateCell,
        deleteProducs,
        goingToDelete,
        apiRef,
        selectedRows,
        setSelectedRows
    }
}
