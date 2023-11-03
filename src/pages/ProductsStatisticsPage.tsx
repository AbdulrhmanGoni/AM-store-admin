"use client"
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import CategoriesEarnings from "../components/products-pages/CategoriesEarnings";
import CategoriesEarningsPercentages from "../components/products-pages/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/products-pages/ProductsTopSales";
import ProductsTopEarnings from "../components/products-pages/ProductsTopEarnings";
import randomColorsArr from "../CONSTANTS/randomColorsArr";
import Icon from "../components/SvgIcon";
import { categoriesIcon, inStockIcon, orderIcon } from "../components/svgIconsAsString";
import { stockIcon } from "../components/stockIcon";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import TopSerieses from "../components/products-pages/TopSerieses";
import TopCategories from "../components/products-pages/TopCategories";
import useProductsStatisticsPageContent from "../hooks/useProductsStatisticsPageContent";
import DisplayInfoBox from "../components/DisplayInfoBox";
import SvgIcon from "../components/SvgIcon";
import PageTitle from "../components/PageTitle";
import { rankingIconMedal } from '../components/rankingIconMedal'
import { rankingIconCup } from '../components/rankingIconCup'
import pageSpaces from "../CONSTANTS/pageSpaces";


export default function ProductsStatisticsPage() {

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
    } = useProductsStatisticsPageContent();

    const infoBoxStyle = { flexBasis: "50%", p: 2 }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <PageTitle
                title="Products Statistics"
                description="View statistics and information of products & categories & serieses"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", gap: pageSpaces }}>
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Products"
                            body={nDecorator(String(productsTotals?.totalProducts))}
                            iconColor={randomColorsArr[0]}
                            icon={<Icon svgElementAsString={stockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Categories"
                            body={nDecorator(String(productsTotals?.categoriesCount))}
                            iconColor={randomColorsArr[1]}
                            icon={<Icon svgElementAsString={categoriesIcon} />}
                            BoxStyle={infoBoxStyle}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", gap: pageSpaces }}>
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="Products Sold"
                            body={nDecorator(String(productsTotals?.totalProductsSold))}
                            iconColor={randomColorsArr[2]}
                            icon={<Icon svgElementAsString={stockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                        <DisplayInfoBox
                            type={media ? "horizontally" : "columnly"}
                            isLoading={productsStatisticsLoading}
                            title="In Stock"
                            body={nDecorator(String(productsTotals?.totalInStock))}
                            iconColor={randomColorsArr[3]}
                            icon={<Icon svgElementAsString={inStockIcon} />}
                            disableIconColor
                            BoxStyle={infoBoxStyle}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6}>
                    <CategoriesEarningsPercentages
                        data={earningsChartData}
                        totalEarnings={totalEarnings}
                        isLoading={chartLoading}
                        isError={chartError}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Paper sx={{ height: "100%", p: 1 }}>
                        <CategoriesEarnings data={earningsChartData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Paper sx={{ p: 1, height: "100%", }}>
                        <TopCategories data={topCategoriesData} height={280} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
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
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} sm={6}>
                    <TopSerieses
                        title="Best Selling"
                        icon={<SvgIcon svgElementAsString={rankingIconCup} width={30} height={30} />}
                        isLoading={topSeriesesLoading}
                        data={topSerieses?.topEarnings}
                        isMoney
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TopSerieses
                        title="Top Selling"
                        icon={<SvgIcon svgElementAsString={rankingIconMedal} width={30} height={30} />}
                        isLoading={topSeriesesLoading}
                        data={topSerieses?.topSold}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}