import { JSX } from "react";
import { Box, Paper, SxProps, Typography } from "@mui/material";
import SmallIconBox from "@/components/SmallIconBox";
import { ElementWithLoadingState, PromiseState } from "@abdulrhmangoni/am-store-library";

interface CardInfoWithChartProps extends PromiseState {
    title: string,
    mainValue: any
    description: string,
    theChart?: JSX.Element,
    icon: JSX.Element,
    sx?: SxProps,
    disableIconColor?: boolean
}

export default function CardInfoWithChart(props: CardInfoWithChartProps) {

    let { theChart, icon, title, mainValue, description, sx, isLoading, disableIconColor } = props

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
            <ElementWithLoadingState
                height={60}
                width={60}
                isLoading={isLoading}
                element={
                    <SmallIconBox
                        boxStyle={{ borderRadius: "50%", p: 1 }}
                        icon={icon}
                        disableIconColor={disableIconColor}
                    />
                }
            />
            <ElementWithLoadingState
                height={24}
                width={200}
                isLoading={isLoading}
                element={<Typography variant="h6">{title}</Typography>}
            />
            <Box className="flex-column-center" sx={{ mb: 2, gap: 1 }}>
                <ElementWithLoadingState
                    height={33}
                    width={175}
                    isLoading={isLoading}
                    element={
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "1.7rem", color: "success.main" }}
                        >
                            {mainValue}
                        </Typography>
                    }
                />
                <ElementWithLoadingState
                    height={20}
                    isLoading={isLoading}
                    width={150}
                    element={<Typography variant="body1">{description}</Typography>}
                />
            </Box>
            <ElementWithLoadingState
                height={80}
                width={220}
                isLoading={isLoading}
                element={theChart!}
            />
        </Paper>
    )
}