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
        titleEndIcon?: JSX.Element
    },
}

export default function CustomChartBox({
    title, mainValue, titleIcon,
    smallChart, chartDescription,
    mainValueColor, isLoading,
    mainValueEndIcon, customMainValue
}: chartBoxProps) {

    return (
        <Box
            className="flex-column j-around full-width full-height"
            sx={{ p: "10px 8px", boxSizing: "border-box" }}
        >
            <Box className="flex-row j-between a-start gap1">
                <Box
                    className="flex-row a-center gap1"
                    sx={{ "& > svg": { fontSize: "27px", color: "primary.main" } }}
                >
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
            <Box className="flex-row j-between a-end gap1">
                <ElementWithLoadingState
                    width={150}
                    height={47}
                    isLoading={isLoading}
                    element={
                        customMainValue || (
                            <P
                                sx={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "1.7rem" }}
                                color={`${mainValueColor ?? "none"}.main`}>
                                {mainValue} {mainValueEndIcon}
                            </P>
                        )
                    }
                />
                <ElementWithLoadingState
                    width={130}
                    height={55}
                    isLoading={isLoading}
                    element={
                        <Box className="flex-column a-end">
                            <P
                                variant="h6"
                                className="flex-row a-center"
                                sx={{ gap: "2px", "& > svg": { fontSize: "1.3rem" } }}
                            >
                                {chartDescription?.title} {chartDescription?.titleEndIcon}
                            </P>
                            <P variant="subtitle1">
                                {chartDescription?.subTitle}
                            </P>
                        </Box>
                    }
                />
            </Box>
        </Box>
    )
}