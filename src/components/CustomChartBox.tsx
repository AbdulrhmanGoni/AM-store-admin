import { Typography, Box } from "@mui/material"
import LoadingGrayBar from "./LoadinGrayBar";

type strOrnum = string | number

interface chartBoxProps {
    title: strOrnum,
    mainValue?: any,
    customMainValue?: any,
    titleIcon: any,
    mainValueColor?: string,
    mainValueEndIcon?: any,
    smallChart: any,
    chartDescription?: { title: strOrnum, subTitle: strOrnum, severity?: string, titleEndIcon?: any },
    loading?: boolean,
    error?: boolean,
}

const containerStyle = {
    display: "flex", p: "10px 8px",
    boxSizing: "border-box",
    flexDirection: "column",
    width: "100%", height: "100%",
    justifyContent: "space-around"
}
const containerChildrenStyle = {
    display: "flex", gap: 1,
    justifyContent: "space-between"
}

export default function CustomChartBox({
    title, mainValue, titleIcon,
    smallChart, chartDescription, error,
    mainValueColor, loading,
    mainValueEndIcon, customMainValue
}: chartBoxProps) {

    function ItemDisplay({ children, w, h }) {
        return loading ? <LoadingGrayBar type="rou" w={w} h={h}></LoadingGrayBar> : error ? <></> : children
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={{ ...containerChildrenStyle, alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, "& > svg": { fontSize: "27px", color: "primary.main" } }}>
                    <ItemDisplay w={35} h={35}>{titleIcon}</ItemDisplay>
                    <ItemDisplay w={140} h={35}><Typography variant="h6">{title}</Typography></ItemDisplay>
                </Box>
                <ItemDisplay w={140} h={65}>{smallChart}</ItemDisplay>
            </Box>
            <Box sx={{ ...containerChildrenStyle, alignItems: "flex-end" }}>
                <ItemDisplay w={150} h={47}>
                    {customMainValue ?? <Typography
                        sx={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "1.7rem" }}
                        color={`${mainValueColor ?? "none"}.main`}>
                        {mainValue} {mainValueEndIcon}
                    </Typography>}
                </ItemDisplay>
                <ItemDisplay w={130} h={55}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography variant="h6"
                            sx={{ display: "flex", alignItems: "center", gap: "2px", "& > svg": { fontSize: "1.3rem" } }}
                            color={`${chartDescription?.severity ?? "success"}.main`}
                        >
                            {chartDescription?.title ?? "55%"} {chartDescription?.titleEndIcon}
                        </Typography>
                        <Typography variant="subtitle1">
                            {chartDescription?.subTitle ?? "This month"}
                        </Typography>
                    </Box>
                </ItemDisplay>
            </Box>
        </Box >
    )
}