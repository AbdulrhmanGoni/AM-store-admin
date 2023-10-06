"use client"
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import CategoriesEarnings from "../components/CategoriesEarnings";
import CategoriesEarningsPercentages from "../components/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/ProductsTopSales";
import ProductsTopEarnings from "../components/ProductsTopEarnings";
import randomColorsArr from "@/CONSTANT/randomColorsArr";
import Icon from "@/components/SvgIcon";
import { categoriesIcon, inStockIcon } from "@/components/svgIconsAsString";
import { stockIcon } from "@/components/stockIcon";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import TopSerieses from "../components/TopSerieses";
import TopCategories from "../components/TopCategories";
import useProductsStatisticsContent from "../hooks/useProductsStatisticsContent";
import DisplayInfoBox from "@/components/DisplayInfoBox";


export default function ProductsStatistics() {

    const media = useMediaQuery('(min-width:1200px)')
    const {
        earningsChartData,
        chartLoading,
        chartError,
        totalEarnings,
        productsTotals,
        productsStatisticsLoading,
        topSerieses,
        topSeriesesLoading,
        topCategoriesData,
        topProducts,
        topProductsLoading,
        topProductsError,
    } = useProductsStatisticsContent();

    const infoBoxStyle = { flexBasis: "50%", p: 2 }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Products"
                            body={nDecorator(String(productsTotals?.totalProducts))}
                            color={randomColorsArr[3]}
                            icon={<Icon svgElementAsString={stockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Categories"
                            body={nDecorator(String(productsTotals?.categoriesCount))}
                            color={randomColorsArr[1]}
                            icon={<Icon svgElementAsString={categoriesIcon} />}
                            BoxStyle={infoBoxStyle}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Products Sold"
                            body={nDecorator(String(productsTotals?.totalProductsSold))}
                            color={randomColorsArr[0]}
                            icon={<Icon svgElementAsString={stockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="In Stock"
                            body={nDecorator(String(productsTotals?.totalInStock))}
                            color={randomColorsArr[2]}
                            icon={<Icon svgElementAsString={inStockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ p: 1 }}>
                            <CategoriesEarnings data={earningsChartData} />
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Paper sx={{ p: 1, height: "200px" }}>
                        <CategoriesEarningsPercentages
                            data={earningsChartData}
                            totalEarnings={totalEarnings}
                            isLoading={chartLoading}
                            isError={chartError}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <ProductsTopSales
                            isLoading={topProductsLoading}
                            isError={topProductsError}
                            data={topProducts?.topSales}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <ProductsTopEarnings
                            isLoading={topProductsLoading}
                            isError={topProductsError}
                            data={topProducts?.topEarnings}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={4}>
                    <Paper sx={{ p: 1 }}>
                        <TopCategories
                            data={topCategoriesData}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 1, height: "100%" }}>
                        <TopSerieses
                            isLoading={topSeriesesLoading}
                            data={topSerieses?.topSold}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 1, height: "100%" }}>
                        <TopSerieses
                            isLoading={topSeriesesLoading}
                            data={topSerieses?.topEarnings}
                            isMoney
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}