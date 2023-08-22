import { Box, Typography } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";

type props = {
    children: any,
    title?: string,
    sx?: CSSProperties
}

export default function ApexchartsContainer({ children, title, sx }: props) {
    return (
        <Box component="div" sx={{
            "& svg": { backgroundColor: "transparent !important" },
            width: "100%", ...sx
        }}>
            {title && <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{title}</Typography>}
            {children}
        </Box>
    )
}
