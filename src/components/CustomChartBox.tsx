import { P, ElementWithLoadingState, PromiseState } from "@abdulrhmangoni/am-store-library"
import { Box } from "@mui/material"

type strOrnum = string | number

interface chartBoxProps extends PromiseState {
    title: strOrnum,
    mainValue?: JSX.Element | string | number,
    customMainValue?: JSX.Element,
    titleIcon: JSX.Element,
    mainValueColor?: string,
    mainValueEndIcon?: JSX.Element,
    smallChart: JSX.Element,
    chartDescription?: {
        title: strOrnum,
        subTitle: strOrnum,
        severity?: string,
        titleEndIcon?: JSX.Element
    },
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
    smallChart, chartDescription,
    mainValueColor, isLoading,
    mainValueEndIcon, customMainValue
}: chartBoxProps) {

    return (
        <Box sx={containerStyle}>
            <Box sx={{ ...containerChildrenStyle, alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, "& > svg": { fontSize: "27px", color: "primary.main" } }}>
                    <ElementWithLoadingState
                        width={35}
                        height={35}
                        isLoading={isLoading}
                        element={titleIcon}
                    />
                    <ElementWithLoadingState
                        width={140}
                        height={35}
                        isLoading={isLoading}
                        element={<P variant="h6">{title}</P>}
                    />
                </Box>
                <ElementWithLoadingState
                    width={140}
                    height={65}
                    isLoading={isLoading}
                    element={smallChart}
                />
            </Box>
            <Box sx={{ ...containerChildrenStyle, alignItems: "flex-end" }}>
                <ElementWithLoadingState
                    width={150}
                    height={47}
                    isLoading={isLoading}
                    element={
                        customMainValue ?? <P
                            sx={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "1.7rem" }}
                            color={`${mainValueColor ?? "none"}.main`}>
                            {mainValue} {mainValueEndIcon}
                        </P>
                    }
                />
                <ElementWithLoadingState
                    width={130}
                    height={55}
                    isLoading={isLoading}
                    element={
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <P variant="h6"
                                sx={{ display: "flex", alignItems: "center", gap: "2px", "& > svg": { fontSize: "1.3rem" } }}
                                color={`${chartDescription?.severity ?? "success"}.main`}
                            >
                                {chartDescription?.title ?? "55%"} {chartDescription?.titleEndIcon}
                            </P>
                            <P variant="subtitle1">
                                {chartDescription?.subTitle ?? "This month"}
                            </P>
                        </Box>
                    }
                />
            </Box>
        </Box>
    )
}