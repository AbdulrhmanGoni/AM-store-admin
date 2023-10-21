import { Grid, Box, Paper } from "@mui/material";
import LatestOrdersTable from "../components/orders-page-components/LatestOrdersTable"
import CardInfoWithChart from "../components/CardInfoWithChart";
import { SmalBar } from "../components/SmallChart";
import OrdersStatisticsChart from "../components/orders-page-components/OrdersStatisticsChart";
import { averageOrdersIcon, orderIcon } from "../components/svgIconsAsString";
import SvgIcon from "../components/SvgIcon";
import { faker } from "@faker-js/faker";
import useMonthlyStatistics, { MonthStatistics } from "../hooks/useMonthlyStatistics";
import PageTitle from "../components/PageTitle";
import pageSpaces from "../CONSTANT/pageSpaces";

const boxSx = { width: "100%" }
const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

export default function OrdersManagementPage(){

    const { monthesData, isLoading } = useMonthlyStatistics();

    let totalOrders: number = 0;
    const dataChart: number[] = monthesData?.map((doc: MonthStatistics) => {
        const randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        const orders = doc.totalOrders ? doc.totalOrders : randomNimber
        totalOrders += orders;
        return orders
    }) ?? [0]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <PageTitle
                title="Orders Management"
                description="View statistics, View latest orders, Search for orders"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces, height: "100%" }}>
                        <CardInfoWithChart
                            isLoading={isLoading}
                            theChart={<SmalBar data={dataChart} width={170} />}
                            icon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
                            title="Avarage Orders"
                            mainValue={`${Math.floor(totalOrders / dataChart?.length)} Orders`}
                            description="per month"
                        />
                        {/* <DisplayInfoBox
                            title="Total Orders"
                            type="horizontally"
                            body={nDecorator(totalOrders)}
                            icon={<SvgIcon svgElementAsString={totalIcon} />}
                            color={randomColorsArr[0]}
                            BoxStyle={{ width: "100%", p: 1.5 }}
                        /> */}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={boxSx}>
                        <Paper sx={paperStyle}>
                            <OrdersStatisticsChart data={dataChart} />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <LatestOrdersTable />
        </Box>
    )
}