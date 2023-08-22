import useProductsDisplayer from "@/hooks/useProductsDisplayer";
import { Delete, ReadMore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { GridFooter } from "@mui/x-data-grid";

export default function Footer({ delelteFun, selectedRows }) {

    const { display } = useProductsDisplayer();
    const rowsCount = selectedRows.length

    return (
        <Box sx={{ p: "0px 12px", display: "flex", alignItems: "center", borderTop: "solid rgba(81, 81, 81, 1) 1px", gap: "12px" }}>
            {
                !!rowsCount &&
                <Button
                    endIcon={<Box fontSize={"13px!important"}>{rowsCount}</Box>}
                    startIcon={<Delete />}
                    variant="contained"
                    color='error'
                    size='small'
                    onClick={delelteFun}
                    disabled
                >
                    Delete
                </Button>
            }
            {
                rowsCount === 1 &&
                <Button
                    startIcon={<ReadMore />}
                    variant="contained"
                    size='small'
                    onClick={() => display(selectedRows[0])}
                >
                    Veiw
                </Button>
            }
            <GridFooter style={{ flexGrow: 1, borderTop: "none" }} />
        </Box>
    )
}