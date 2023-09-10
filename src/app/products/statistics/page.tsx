"use client"
import { Box, Grid, Paper } from "@mui/material";
import CategoriesCharts from "../components/CategoriesEarnings";
import CategoriesEarningsPercentages from "../components/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/ProductsTopSales";
import ProductsTopEarnings from "../components/ProductsTopEarnings";

const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

export default function ProductsStatistics() {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={paperStyle}>
                            <CategoriesCharts />
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
                        <Paper sx={{ p: 1, height: "200px" }}>
                            <CategoriesEarningsPercentages />
                        </Paper>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 }, height: "200px" }}>
                            <Paper sx={{ flexBasis: "50%" }}>

                            </Paper>
                            <Paper sx={{ flexBasis: "50%" }}>

                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={paperStyle}><ProductsTopSales /></Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={paperStyle}><ProductsTopEarnings /></Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
