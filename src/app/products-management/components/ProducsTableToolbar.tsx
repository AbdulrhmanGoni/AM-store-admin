import { Box } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";

export default function ToolBar() {
    return (
        <Box sx={{ p: 1, borderBottom: "solid rgba(81, 81, 81, 1) 1px" }}>
            <GridToolbar />
        </Box>
    )
}
