import useProductsDisplayer from "../../hooks/useProductsDisplayer";
import { Delete, Edit, ReadMore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { GridFooter, GridRowSelectionModel } from "@mui/x-data-grid";
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useNavigate } from "react-router-dom";
import DiscountsApplyer from "./DiscountsApplyer";
import { MutableRefObject } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

interface TableFooterProps {
    tableApiRef: MutableRefObject<GridApiCommunity>,
    delelteFun: () => void,
    selectedRows: GridRowSelectionModel
}

export default function Footer({ delelteFun, selectedRows, tableApiRef }: TableFooterProps) {

    const { display } = useProductsDisplayer();
    const navigate = useNavigate();
    const selectedRowsCount = selectedRows.length;

    const warningMessage = `
    Are you sure you want to delete ${selectedRowsCount > 1 ? "these products" : "this product"}, 
    note that you can't undo this procces if you continue
    `;

    function unselectAllRows() {
        tableApiRef.current.setRowSelectionModel([])
    }

    return (
        <Box
            className="flex-row-center"
            sx={{ p: "0px 12px", borderTop: "solid rgba(81, 81, 81, 1) 1px", gap: "12px" }}
        >
            {
                !!selectedRowsCount &&
                <>
                    <ActionAlert
                        action={delelteFun}
                        message={warningMessage}
                        title={`You are going to detete (${selectedRowsCount}) product${selectedRowsCount > 1 ? "s" : ""}`}>
                        <Button
                            endIcon={<Box fontSize={"13px!important"}>{selectedRowsCount}</Box>}
                            startIcon={<Delete />}
                            variant="contained"
                            color='error'
                            size='small'
                            disabled
                        >
                            Delete
                        </Button>
                    </ActionAlert>
                    <DiscountsApplyer productsIds={selectedRows} onDiscountApplyied={unselectAllRows} />
                </>
            }
            {
                selectedRowsCount === 1 &&
                <>
                    <Button
                        endIcon={<ReadMore />}
                        variant="contained"
                        size='small'
                        onClick={() => display(String(selectedRows[0]))}
                    >
                        Veiw
                    </Button>
                    <Button
                        endIcon={<Edit />}
                        variant="contained"
                        size='small'
                        color="info"
                        sx={{ color: "white" }}
                        onClick={() => navigate(`/products/edit-product/${selectedRows[0]}`)}
                    >
                        Edit
                    </Button>
                </>
            }
            <GridFooter style={{ flexGrow: 1, borderTop: "none" }} />
        </Box>
    )
}