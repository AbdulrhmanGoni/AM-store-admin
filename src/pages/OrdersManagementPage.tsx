import { Grid, Box } from "@mui/material";
import LatestOrdersTable from "../components/orders-page-components/LatestOrdersTable"
import CardInfoWithChart from "../components/CardInfoWithChart";
import { SmalBar } from "../components/SmallChart";
import OrdersStatisticsChart from "../components/orders-page-components/OrdersStatisticsChart";
import { averageOrdersIcon, orderIcon, totalIcon } from "../components/svgIconsAsString";
import SvgIcon from "../components/SvgIcon";
import PageTitle from "../components/PageTitle";
import pageSpaces from "../CONSTANTS/pageSpaces";
import randomColorsArr from "../CONSTANTS/randomColorsArr";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import DisplayInfoBox from "../components/DisplayInfoBox";
import useOrdersPageContent from "../hooks/useOrdersPageContent";
import SelectBox from "../components/SelectBox";
import yearsArray from "../functions/yearsArray";


export default function OrdersManagementPage() {

    const {
        chartData,
        currentYear,
        setYear,
        ordersStatistics,
        statisticsAreLoading,
        chartDataLoading,
        chartDataError,
        refetchChartData
    } = useOrdersPageContent();

    const {
        totalOrders,
        canceledOrders,
        completedOrders,
        pendingOrders
    } = ordersStatistics;

    const infoBoxStyle = { width: "100%", height: "100%", p: 2 };

    return (
        <Box className="flex-column" gap={pageSpaces}>
            <Box className="flex-row a-end j-between">
                <PageTitle
                    title="Orders Management"
                    description="View statistics, View latest orders, Search for orders"
                    icon={<SvgIcon svgElementAsString={orderIcon} />}
                />
                <SelectBox
                    defaultValue={currentYear}
                    values={yearsArray()}
                    onSelect={(value) => setYear(+value)}
                />
            </Box>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        title="Total Orders"
                        type="columnly"
                        isLoading={statisticsAreLoading}
                        body={nDecorator(totalOrders)}
                        icon={<SvgIcon svgElementAsString={totalIcon} />}
                        iconColor={randomColorsArr[0]}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        title="Completed Orders"
                        type="columnly"
                        isLoading={statisticsAreLoading}
                        body={nDecorator(completedOrders)}
                        icon={<img src="/icons/completed.svg" />}
                        iconColor={randomColorsArr[1]}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        title="Pending Orders"
                        type="columnly"
                        isLoading={statisticsAreLoading}
                        body={nDecorator(pendingOrders)}
                        icon={<img src="/icons/waiting.svg" />}
                        iconColor={randomColorsArr[2]}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        title="Canceled Orders"
                        type="columnly"
                        isLoading={statisticsAreLoading}
                        body={nDecorator(canceledOrders)}
                        icon={<img src="/icons/canceling.svg" />}
                        iconColor={randomColorsArr[3]}
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces} mb={2}>
                <Grid item xs={12} md={5.5} lg={4}>
                    <CardInfoWithChart
                        isLoading={statisticsAreLoading}
                        theChart={<SmalBar data={chartData} width={170} />}
                        icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
                        title="Avarage Orders"
                        mainValue={`${Math.floor(totalOrders / 12)} Orders`}
                        description="per month"
                    />
                </Grid>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <OrdersStatisticsChart
                            isLoading={chartDataLoading}
                            isError={chartDataError}
                            refetch={refetchChartData}
                            year={currentYear}
                            data={chartData}
                        />
                    </Box>
                </Grid>
            </Grid>
            <PageTitle
                title="Latest Orders"
                description="View the details of latest orders"
                icon={<img src="/icons/booking-history.svg" />}
            />
            <LatestOrdersTable />
        </Box>
    )
}