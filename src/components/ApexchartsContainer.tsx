import { JSX } from "react";
import { Box } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";

type props = {
    children: JSX.Element | JSX.Element[],
    title?: string,
    sx?: CSSProperties
}

export default function ApexchartsContainer({ children, sx }: props) {
    return (
        <Box component="div" sx={{
            width: "100%", ...sx,
            "& svg": { backgroundColor: "transparent !important" },
        }}>
            {children}
        </Box>
    )
}
