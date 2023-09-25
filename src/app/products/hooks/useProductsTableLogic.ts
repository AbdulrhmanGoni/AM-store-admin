import { GridCellParams, GridRowSelectionModel, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useProductsPagination from "./useProductsPagination";
import useGetApi from "@/hooks/useGetApi";
import useNotifications from "@/hooks/useNotifications";
import useMutateApi from "@/hooks/useMutateApi";


export default function useProductsTableLogic() {

    const apiRef = useGridApiRef();
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [goingToDelete, setGoingToDelete] = useState<GridRowSelectionModel>([]);
    const [tablesMassages, setTablesMassages] = useState<string>("No products");

    const { bySteps, promised } = useNotifications();
    const { data: productsLength, isError } = useGetApi({ key: ["products-length"], path: "products/length" });
    const { mutateAsync: updateProduct } = useMutateApi({ key: ["update-filed"], path: "admin/products?type=update-filed" });
    const { mutateAsync: deleteProducts } = useMutateApi({ key: ["delete-products"], path: "admin/products" });

    const {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
    } = useProductsPagination({ productsLength })

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


    return {
        products,
        paginationModel,
        setPaginationModel,
        isLoading,
        updateCell,
        deleteProducs,
        tablesMassages,
        goingToDelete,
        productsLength,
        apiRef,
        selectedRows,
        setSelectedRows
    }
}
