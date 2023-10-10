"use client"
import { FC } from "react";
import { Grid, Box, Paper } from "@mui/material";
import LatestOrdersTable from "./components/LatestOrdersTable"
import CardInfoWithChart from "@/components/CardInfoWithChart";
import { SmalBar } from "@/components/SmallChart";
import OrdersStatisticsChart from "./components/OrdersStatisticsChart";
import { averageOrdersIcon, orderIcon } from "@/components/svgIconsAsString";
import SvgIcon from "@/components/SvgIcon";
import { faker } from "@faker-js/faker";
import { pageSpaces } from "../page";
import useMonthlyStatistics from "@/hooks/useMonthlyStatistics";
import PageTitle from "@/components/PageTitle";

const boxSx = { width: "100%" }
const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

const OrdersManagement: FC = function () {

    const { data, isError, isLoading } = useMonthlyStatistics();

    let totalOrders: number = 0;
    const dataChart: number[] = data?.map((doc: { totalOrders: number }) => {
        let randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        let orders = !!doc.totalOrders ? doc.totalOrders : randomNimber
        totalOrders += orders;
        return orders
    }) ?? [0]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <PageTitle
                title="Orders Management"
                descreption="View statistics, View latest orders, Search for orders"
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

export default OrdersManagement