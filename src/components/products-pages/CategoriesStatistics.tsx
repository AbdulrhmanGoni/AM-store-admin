import { Alert, Box, Paper } from "@mui/material";
import { P, nDecorator, FetchFailedAlert } from "@abdulrhmangoni/am-store-library";
import { SmalDonut } from "../SmallChart";
import useCategoriesStatistics, { CategoryStatistics } from "../../hooks/useCategoriesStatistics";
import randomColorsArr from "../../CONSTANTS/randomColorsArr";
import useBreakPoints from "../../hooks/useBreakPoints";
import LoadingCategoryCard from "./LoadingCategoryCard";
import CategoryStatisticsCard from "./CategoryStatisticsCard";


export default function CategoriesStatistics() {

    const { data: categoriesStatistics, isLoading, isError } = useCategoriesStatistics();
    const { xSmallScreen } = useBreakPoints();

    let totalEarnings: number = 0;
    const chartData: number[] = [], chartColors: string[] = [];

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
    const donutStyle = !isLoading && !categoriesStatistics.length && {
        borderRadius: "50%",
        border: "solid 2px",
        borderColor: `${isError ? "error" : "info"}.main`
    }

    return (
        <Paper
            className="flex-row-center-between gap2 full-height"
            sx={{ p: 2, flexDirection: { xs: "column-reverse", sm: "row" } }}
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
                    isLoading ? <LoadingCategoryCard />
                        : isError ? <FetchFailedAlert message="Error in fetching statistics!"></FetchFailedAlert>
                            : categoriesStatistics.length ?
                                categoriesStatistics.map((cat: CategoryStatistics, index) => (
                                    <CategoryStatisticsCard
                                        key={cat.category}
                                        category={cat}
                                        cardColor={chartColors[index]}
                                        total={totalEarnings}
                                    />
                                )) :
                                <Alert severity="info" style={{ width: "100%", justifyContent: "center" }}>
                                    No Categories Statistics
                                </Alert>
                }
            </Box>
            <Box sx={{ position: "relative", ...donutStyle }} >
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