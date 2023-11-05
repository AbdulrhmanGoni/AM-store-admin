import { Alert, Box, Paper, Skeleton, alpha, capitalize } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalDonut } from "../SmallChart";
import { PromiseState } from "../../types/interfaces";
import calculatePercentage from "../../functions/calculatePercentage";
import { chartCategory } from "../../hooks/useMonthlyCategoriesStatistics";
import P, { PProps } from "../P";
import useCategoriesStatistics, { CategoryStatistics } from "../../hooks/useCategoriesStatistics";
import randomColorsArr from "../../CONSTANTS/randomColorsArr";
import useBreakPoints from "../../hooks/useBreakPoints";


interface CategoriesEarningsPercentages extends PromiseState {
    data: chartCategory[],
    totalEarnings: number
}

const rowClass = "flex-row-center-between full-width"

export default function CategoriesEarningsPercentages() {

    const { data: categoriesStatistics, isLoading, isError } = useCategoriesStatistics()
    const { xSmallScreen } = useBreakPoints()

    let totalEarnings: number = 0
    const chartData: number[] = [], chartColors: string[] = []

    categoriesStatistics.forEach((cat: CategoryStatistics, index) => {
        totalEarnings += cat.totalEarnings
        chartData[index] = cat.totalEarnings
        chartColors[index] = randomColorsArr[index]
    })

    function scrollToCategoryInfo(categoryIndex: number) {
        const parentElement = document.getElementById("categories-statistics-container")
        const clickedElement = document.getElementById(categoriesStatistics[categoryIndex].category)
        if (parentElement && clickedElement) {
            if (xSmallScreen) {
                parentElement.scrollTop = clickedElement.offsetTop - parentElement.offsetTop
            } else {
                parentElement.scrollLeft = clickedElement.offsetLeft - parentElement.offsetLeft
            }
        }
    }

    return (
        <Paper
            className="flex-row-center-between gap2 full-height"
            sx={{
                p: 2,
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" }
            }}
        >
            <Box
                id="categories-statistics-container"
                sx={{
                    maxHeight: "155px",
                    scrollBehavior: "smooth",
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    overflow: "auto",
                    flex: 1, gap: 1
                }}
            >
                {
                    isLoading ? <LoadingState />
                        : categoriesStatistics.length ?
                            categoriesStatistics.map((cat: CategoryStatistics, index) => {
                                const {
                                    category,
                                    totalEarnings: categoryEarnings,
                                    productsCount,
                                    productsSold
                                } = cat
                                const color = chartColors[index]
                                const PProps: PProps = { className: rowClass, variant: "body1" }
                                return (
                                    <Box
                                        id={category}
                                        key={category}
                                        component="div"
                                        className="flex-column-center"
                                        sx={{
                                            maxHeight: "160px",
                                            minWidth: "190px",
                                            bgcolor: alpha(color, .2),
                                            borderRadius: 1,
                                            p: 1, gap: .25,
                                            userSelect: "none",
                                            flex: 1
                                        }}>
                                        <Box sx={{ mb: 1 }} className={rowClass}>
                                            <P className="flex-row-center-start gap1">
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        width: 15,
                                                        height: 15,
                                                        borderRadius: "50%",
                                                        bgcolor: color
                                                    }} />
                                                {capitalize(category)}
                                            </P>
                                            <P color={color}>{calculatePercentage(totalEarnings, categoryEarnings)}%</P>
                                        </Box>
                                        <P {...PProps}>Earnings <Box component="span">${nDecorator(categoryEarnings.toFixed(0))}</Box></P>
                                        <P {...PProps}>Products Count <Box component="span">{productsCount}</Box></P>
                                        <P {...PProps}>Products Sold <Box component="span">{productsSold}</Box></P>
                                    </Box>
                                )
                            })
                            : isError ? <Alert className="flex-row-center" severity="error">Error !</Alert> : null
                }
            </Box>
            <Box position="relative">
                <SmalDonut
                    data={chartData}
                    tooltipIsMony
                    height={140}
                    width={140}
                    onSelect={scrollToCategoryInfo}
                    colors={chartColors}
                />
                <P className="centering" sx={{ top: "42%" }}>Total</P>
                <P className="centering" sx={{ top: "58%" }}>${nDecorator(totalEarnings.toFixed(0))}</P>
            </Box>
        </Paper>
    )
}

function LoadingState() {
    return Array.from(Array(3)).map((_, i) => {
        return (
            <Box
                key={i}
                className="flex-column-center"
                sx={{
                    maxHeight: "160px",
                    minWidth: "190px",
                    borderRadius: 1,
                    p: 1, gap: 1,
                    flex: 1
                }}>
                <Box sx={{ mb: 1 }} className={rowClass}>
                    <Box className="flex-row-center-start gap1">
                        <Skeleton variant="circular" width={17} height={17} />
                        <Skeleton variant="rounded" width={80} height={18} />
                    </Box>
                    <Skeleton variant="rounded" width={45} height={18} />
                </Box>
                <Box className={rowClass}>
                    <Skeleton variant="rounded" width={70} height={17} />
                    <Skeleton variant="rounded" width={55} height={17} />
                </Box>
                <Box className={rowClass}>
                    <Skeleton variant="rounded" width={82} height={17} />
                    <Skeleton variant="rounded" width={40} height={17} />
                </Box>
                <Box className={rowClass}>
                    <Skeleton variant="rounded" width={80} height={17} />
                    <Skeleton variant="rounded" width={40} height={17} />
                </Box>
            </Box>
        )
    })
}