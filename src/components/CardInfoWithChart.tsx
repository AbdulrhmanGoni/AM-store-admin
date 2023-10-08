import { JSX } from "react";
import { Box, Paper, SxProps, Typography } from "@mui/material";
import SmallIconBox from "@/components/SmallIconBox";

type AverageOrdersProps = {
    title: string,
    mainValue: any
    description: string,
    theChart?: JSX.Element,
    icon: JSX.Element,
    sx?: SxProps,
}

export default function CardInfoWithChart({ theChart, icon, title, mainValue, description, sx }: AverageOrdersProps) {

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1, p: 2,
                height: "100%",
                width: "100%",
                textAlign: "center",
                ...sx
            }}
        >
            <SmallIconBox
                boxStyle={{ borderRadius: "50%", p: 1 }}
                icon={icon}
            />
            <Typography variant="h6">{title}</Typography>
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body1"
                    sx={{ fontSize: "1.7rem", color: "success.main" }}
                >
                    {mainValue}
                </Typography>
                <Typography variant="body1">{description}</Typography>
            </Box>
            {theChart}
        </Paper>
    )
}
