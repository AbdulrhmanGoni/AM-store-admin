import { JSX } from "react";
import { Paper } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";

type props = {
    children: JSX.Element | JSX.Element[],
    title?: string,
    sx?: CSSProperties
}

export default function ApexchartsContainer({ children, sx }: props) {
    return (
        <Paper
            component="div"
            sx={{
                width: "100%",
                p: { xs: 0, sm: 1 },
                "& svg": { backgroundColor: "transparent !important" },
                "& .apexcharts-legend-text": { ml: "-10px !important" },
                ...sx
            }}>
            {children}
        </Paper>
    )
}
