"use client"
import { FC } from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import LatestOrdersTable from "./components/LatestOrdersTable"
import AverageOrders from "./components/AverageOrders";
import OrdersStatisticsChart from "./components/OrdersStatisticsChart";
import { orderIcon, totalIcon } from "@/components/svgIconsAsString";
import SmallIconBox from "@/components/SmallIconBox";
import Icon from "@/components/SvgIcon";
import useGetApi from "@/hooks/useGetApi";
import { faker } from "@faker-js/faker";
import randomColorsArr from "@/CONSTANT/randomColorsArr";

const boxSx = { width: "100%" }
const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

const ProductsManagement: FC = function () {

    const path = "statistics/?get=statistics-history&return=totalOrders,date";
    const { data, isLoading, isError } = useGetApi({ path, key: ["orders-statistics"] });

    let totalOrders: number = 0;
    const dataChart: number[] = data?.map((doc: { totalOrder: number }) => {
        let randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        let orders = !!doc.totalOrder ? doc.totalOrder : randomNimber
        totalOrders += orders;
        return orders
    }) ?? [0]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }} >
            <Box>
                <Typography
                    variant='h5'
                    sx={{ mb: 1, position: "relative", display: "flex", alignItems: "center", gap: 1.5 }}>
                    Orders Management
                    <SmallIconBox
                        icon={<Icon svgElementAsString={orderIcon} />}
                        svgIconSize={25}
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
                        <Paper sx={{ height: "200px", p: 1 }}>
                            <AverageOrders
                                data={dataChart}
                                totalOrders={totalOrders}
                                isLoading={isLoading}
                                isError={isError}
                            />
                        </Paper>
                        <Box sx={{ display: "flex", gap: { xs: 1, md: 2 }, height: "200px" }}>
                            <Paper sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                textAlign: "center",
                                flexBasis: "50%",
                                gap: 1.5, p: 1
                            }}>
                                <SmallIconBox
                                    svgIconSize={30}
                                    color={randomColorsArr[0]}
                                    boxStyle={{ p: 1, }}
                                    icon={<Icon svgElementAsString={totalIcon} />}
                                />
                                <Box>
                                    <Typography variant="h6">Total Orders</Typography>
                                    <Typography variant="h5">{totalOrders}</Typography>
                                </Box>
                            </Paper>
                            <Paper sx={{ flexBasis: "50%" }}></Paper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={boxSx}>
                        <Paper sx={paperStyle}>
                            <OrdersStatisticsChart data={dataChart}/>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <LatestOrdersTable />
        </Box>
    )
}

export default ProductsManagement