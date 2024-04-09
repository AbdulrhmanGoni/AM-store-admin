import { Box } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import ProductsTableCategoriesFilter from "./ProductsTableCategoriesFilter";

export default function ProducsTableToolbar() {

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            p: 1, gap: 1,
            borderBottom: "solid rgba(81, 81, 81, 1) 1px",
            "& .MuiDataGrid-toolbarContainer": { pt: 0 }
        }}>
            <GridToolbar />
            <ProductsTableCategoriesFilter />
        </Box>
    )
}
