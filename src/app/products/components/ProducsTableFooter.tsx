import useProductsDisplayer from "@/hooks/useProductsDisplayer";
import { Delete, Edit, ReadMore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { GridFooter } from "@mui/x-data-grid";
import { ActionAlert } from '@abdulrhmangoni/am-store-library';


export default function Footer({ delelteFun, selectedRows }) {

    const { display } = useProductsDisplayer();
    const rowsCount = selectedRows.length;

    const warningMessage = `
    Are you sure you want to delete ${rowsCount > 1 ? "these products" : "this product"}, 
    note that you can't undo this procces if you continue
    `

    return (
        <Box sx={{ p: "0px 12px", display: "flex", alignItems: "center", borderTop: "solid rgba(81, 81, 81, 1) 1px", gap: "12px" }}>
            {
                !!rowsCount &&
                <ActionAlert
                    action={delelteFun}
                    message={warningMessage}
                    title={`You are going to detete (${rowsCount}) product${rowsCount > 1 ? "s" : ""}`}>
                    <Button
                        endIcon={<Box fontSize={"13px!important"}>{rowsCount}</Box>}
                        startIcon={<Delete />}
                        variant="contained"
                        color='error'
                        size='small'
                    // disabled
                    >
                        Delete
                    </Button>
                </ActionAlert>
            }
            {
                rowsCount === 1 &&
                <>
                    <Button
                        endIcon={<ReadMore />}
                        variant="contained"
                        size='small'
                        onClick={() => display(selectedRows[0])}
                    >
                        Veiw
                    </Button>
                    <Button
                        endIcon={<Edit />}
                        variant="contained"
                        size='small'
                        onClick={() => display(selectedRows[0])}
                    >
                        Edit
                    </Button>
                </>
            }
            <GridFooter style={{ flexGrow: 1, borderTop: "none" }} />
        </Box>
    )
}