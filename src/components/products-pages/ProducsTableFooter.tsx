import useProductsDisplayer from "../../hooks/useProductsDisplayer";
import { ArrowLeft, ArrowRight, Delete, Edit, ReadMore } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useNavigate } from "react-router-dom";
import DiscountsApplyer from "./DiscountsApplyer";
import { Dispatch, MutableRefObject } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

interface TableFooterProps {
    tableApiRef: MutableRefObject<GridApiCommunity>,
    delelteFun: () => void,
    pagination: {
        setModel: Dispatch<React.SetStateAction<GridPaginationModel>>
        model: GridPaginationModel,
        thereIsMore: boolean,
        loadedPages: number[],
    }
    selectedRows: GridRowSelectionModel,
}

type NavigationDirection = "next" | "prev"

export default function Footer({ delelteFun, selectedRows, tableApiRef, pagination }: TableFooterProps) {

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

    return (
        <Box
            className="flex-row-center-start"
            sx={{
                px: 1.5,
                borderTop: "solid 1px",
                borderColor: "divider",
                width: "100%",
                minHeight: "53px",
                overflowX: "auto"
            }}
        >
            {
                !!selectedRowsCount &&
                <>
                    <ActionAlert
                        action={delelteFun}
                        message={warningMessage}
                        title={`You are going to detete (${selectedRowsCount}) product${selectedRowsCount > 1 ? "s" : ""}`}
                    >
                        <Button
                            endIcon={<Box fontSize={"13px!important"}>{selectedRowsCount}</Box>}
                            startIcon={<Delete />}
                            variant="contained"
                            color='error'
                            size='small'
                            sx={{ mr: 1.5 }}
                        >
                            Delete
                        </Button>
                    </ActionAlert>
                    <DiscountsApplyer
                        productsIds={selectedRows}
                        onDiscountApplyied={unselectAllRows}
                        style={{ mr: 1.5 }}
                    />
                </>
            }
            {
                selectedRowsCount === 1 &&
                <>
                    <Button
                        endIcon={<ReadMore />}
                        variant="contained"
                        size='small'
                        sx={{ minWidth: "fit-content", mr: 1.5 }}
                        onClick={() => display(String(selectedRows[0]))}
                    >
                        Veiw
                    </Button>
                    <Button
                        endIcon={<Edit />}
                        variant="contained"
                        size='small'
                        color="info"
                        sx={{ color: "white", minWidth: "fit-content", mr: 1.5 }}
                        onClick={() => navigate(`/products/edit-product/${selectedRows[0]}`)}
                    >
                        Edit
                    </Button>
                </>
            }
            <Box className="flex-row a-center gap1" sx={{ ml: "auto" }}>
                <NavigationButton
                    paginateFunction={paginate}
                    navigationDir="prev"
                    disabled={pagination.model.page < 1}
                />
                <Typography width="fit-content">page: {pagination.model.page + 1}</Typography>
                <NavigationButton
                    paginateFunction={paginate}
                    navigationDir="next"
                    disabled={
                        !pagination.thereIsMore &&
                        pagination.model.page === pagination.loadedPages[pagination.loadedPages.length - 1]
                    }
                />
            </Box>
        </Box>
    )
}

interface NavigationButtonProps {
    disabled: boolean,
    navigationDir: NavigationDirection,
    paginateFunction: (dir: NavigationDirection) => void
}

function NavigationButton({ disabled, navigationDir, paginateFunction }: NavigationButtonProps) {
    return (
        <IconButton
            size="small"
            sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                p: { xs: .3, md: .5 }
            }}
            onClick={() => { paginateFunction(navigationDir) }}
            disabled={disabled}
        >
            {navigationDir === "prev" ? <ArrowLeft /> : <ArrowRight />}
        </IconButton>
    )
}