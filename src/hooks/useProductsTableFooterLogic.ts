import { useNavigate } from "react-router-dom";
import useProductsDisplayer from "./useProductsDisplayer";
import { TableFooterProps } from "../components/products-pages/ProducsTableFooter";

export type NavigationDirection = "next" | "prev";

export default function useProductsTableFooterLogic({ selectedRows, tableApiRef, pagination }: TableFooterProps) {

    const { display } = useProductsDisplayer();
    const navigate = useNavigate();
    const selectedRowsCount = selectedRows.length;

    const warningMessage = `
    Are you sure you want to delete ${selectedRowsCount > 1 ? "these products" : "this product"}, 
    note that you can't undo this procces if you continue
    `;

    function unselectAllRows() { tableApiRef.current.setRowSelectionModel([]) }

    function paginate(dir: NavigationDirection) {
        pagination.setModel(state => {
            return {
                ...state,
                page: dir === "next" ? state.page + 1
                    : state.page - 1
            }
        })
    }

    return {
        display,
        navigate,
        paginate,
        unselectAllRows,
        warningMessage,
        selectedRowsCount
    }
}
