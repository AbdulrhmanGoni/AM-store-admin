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


export default function OrdersManagementPage() {

    const {
        dataChart,
        year,
        ordersStatistics,
        statisticsAreLoading
    } = useOrdersPageContent();

    const {
        totalOrders,
        canceledOrders, 
        completedOrders, 
        pendingOrders
    } = ordersStatistics;

    const infoBoxStyle = { width: "100%", height: "100%", p: 2 };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <PageTitle
                title="Orders Management"
                description="View statistics, View latest orders, Search for orders"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
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
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={5.5} lg={4}>
                    <CardInfoWithChart
                        isLoading={statisticsAreLoading}
                        theChart={<SmalBar data={dataChart} width={170} />}
                        icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
                        title="Avarage Orders"
                        mainValue={`${Math.floor(totalOrders / 12)} Orders`}
                        description="per month"
                    />
                </Grid>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <OrdersStatisticsChart year={year} data={dataChart} />
                    </Box>
                </Grid>
            </Grid>
            <LatestOrdersTable />
        </Box>
    )
}