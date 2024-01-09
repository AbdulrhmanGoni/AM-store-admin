import { Box, Grid } from "@mui/material";
import CardInfoWithChart from "../CardInfoWithChart";
import { SmalBar } from "../SmallChart";
import SvgIcon from "../SvgIcon";
import pageSpaces from "../../CONSTANTS/pageSpaces";
import OrdersStatisticsChart from "./OrdersStatisticsChart";
import { averageOrdersIcon } from "../svgIconsAsString";
import useMonthlySalesStatistics, { MonthSalesStatistics } from "../../hooks/useMonthlySalesStatistics";

export default function ChartAndAvarageOrdersSections() {

    const {
        data: monthesData,
        currentYear,
        setYear,
        isLoading: chartDataLoading,
        isError: chartDataError,
        refetch: refetchChartData
    } = useMonthlySalesStatistics();

    let totalOrders = 0;
    const chartData: number[] = monthesData?.map((doc: MonthSalesStatistics) => {
        totalOrders += doc.totalOrders
        return doc.totalOrders
    }) ?? [0]

    return (
        <Grid container spacing={pageSpaces} mb={2}>
            <Grid item xs={12} md={5.5} lg={4}>
                <CardInfoWithChart
                    isLoading={chartDataLoading}
                    theChart={<SmalBar data={chartData} width={170} />}
                    icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
                    title={`Avarage Orders ( ${currentYear} )`}
                    mainValue={`${(totalOrders / 12).toFixed(2)} Orders`}
                    description="per month"
                    sx={{ position: "relative" }}
                />
            </Grid>
            <Grid item xs={12} md={6.5} lg={8}>
                <Box sx={{ width: "100%" }}>
                    <OrdersStatisticsChart
                        isLoading={chartDataLoading}
                        isError={chartDataError}
                        refetch={refetchChartData}
                        currentYear={currentYear}
                        setYear={setYear}
                        data={chartData}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}
