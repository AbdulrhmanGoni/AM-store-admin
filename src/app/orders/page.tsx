"use client"
import { FC } from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import LatestOrdersTable from "./components/LatestOrdersTable"
import AverageOrders from "./components/AverageOrders";
import OrdersStatisticsChart from "./components/OrdersStatisticsChart";
import { ordersManagement } from "@/components/svgIconsAsString";
import SmallIconBox from "@/components/SmallIconBox";
import Icon from "@/components/SvgIcon";

const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}
const boxSx = { width: "100%" }

const ProductsManagement: FC = function () {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }} >
            <Box>
                <Typography
                    variant='h5'
                    sx={{ mb: 1, position: "relative", display: "flex", alignItems: "center", gap: 1.5 }}>
                    Orders Management
                    <SmallIconBox
                        icon={<Icon width={23} height={23} svgElementAsString={ordersManagement} />}
                        boxStyle={{ p: .3 }}
                    />
                </Typography>
                <Typography variant='body1'>
                    View statistics, View latest orders, Search for orders
                </Typography>
            </Box>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
                        <Paper sx={{ p: 1, height: "200px" }}><AverageOrders /></Paper>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 }, height: "200px" }}>
                            <Paper sx={{ flexBasis: "50%" }}></Paper>
                            <Paper sx={{ flexBasis: "50%" }}></Paper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={boxSx}><Paper sx={paperStyle}><OrdersStatisticsChart /></Paper></Box>
                </Grid>
            </Grid>
            <LatestOrdersTable />
        </Box>
    )
}

export default ProductsManagement