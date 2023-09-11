"use client"
import { Grid, Box, Typography, Paper } from "@mui/material";
import LatestOrdersTable from "./components/LatestOrdersTable"
import { FC } from "react";
import AverageOrders from "./components/AverageOrders";
import OrdersStatisticsChart from "./components/OrdersStatisticsChart";

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
                    sx={{ mb: 1, position: "relative" }}>
                    Orders Management
                </Typography>
                <Typography variant='body1'>View orders statistics, View latest orders and manage the orders</Typography>
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