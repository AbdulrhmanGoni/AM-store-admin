"use client"
import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import CategoriesMonthlyEarnings from "../components/products-pages/CategoriesMonthlyEarnings";
import CategoriesEarningsPercentages from "../components/products-pages/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/products-pages/ProductsTopSales";
import ProductsTopEarnings from "../components/products-pages/ProductsTopEarnings";
import randomColorsArr from "../CONSTANTS/randomColorsArr";
import SvgIcon from "../components/SvgIcon";
import { inStockIcon, orderIcon } from "../components/svgIconsAsString";
import { stockIcon } from "../components/stockIcon";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import TopSerieses from "../components/products-pages/TopSerieses";
import TopCategories from "../components/products-pages/TopCategories";
import useProductsStatisticsPageContent from "../hooks/useProductsStatisticsPageContent";
import DisplayInfoBox from "../components/DisplayInfoBox";
import PageTitle from "../components/PageTitle";
import { rankingIconMedal } from '../components/rankingIconMedal'
import { rankingIconCup } from '../components/rankingIconCup'
import pageSpaces from "../CONSTANTS/pageSpaces";


export default function ProductsStatisticsPage() {

    const media = useMediaQuery('(min-width:1200px)')
    const {
        earningsChartData,
        productsStatistics,
        productsStatisticsLoading,
        topSerieses,
        topSeriesesLoading,
        topCategoriesData,
        topProducts,
        topProductsLoading,
        topProductsError,
    } = useProductsStatisticsPageContent();

    const { 
        totalInStock, 
        totalProducts, 
        productsOutOfStock, 
        totalProductsSold,
        seriesesCount,
        categoriesCount
    } = productsStatistics

    const infoBoxStyle = { flexBasis: "50%", p: 2 }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: pageSpaces }}>
            <PageTitle
                title="Products Statistics"
                description="View statistics and information of products & categories & serieses"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={3}>
                    <DisplayInfoBox
                        type={media ? "horizontally" : "columnly"}
                        isLoading={productsStatisticsLoading}
                        title="Products"
                        body={nDecorator(String(totalProducts))}
                        iconColor={randomColorsArr[0]}
                        icon={<SvgIcon svgElementAsString={stockIcon} />}
                        disableIconColor
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DisplayInfoBox
                        type={media ? "horizontally" : "columnly"}
                        isLoading={productsStatisticsLoading}
                        title="Products Sold"
                        body={nDecorator(String(totalProductsSold))}
                        iconColor={randomColorsArr[1]}
                        icon={<img src="/icons/salesShop.svg" />}
                        disableIconColor
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DisplayInfoBox
                        type={media ? "horizontally" : "columnly"}
                        isLoading={productsStatisticsLoading}
                        title="In Stock"
                        body={nDecorator(String(totalInStock))}
                        iconColor={randomColorsArr[2]}
                        icon={<SvgIcon svgElementAsString={inStockIcon} />}
                        disableIconColor
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DisplayInfoBox
                        type={media ? "horizontally" : "columnly"}
                        isLoading={productsStatisticsLoading}
                        title="Out of Stock"
                        body={nDecorator(String(productsOutOfStock))}
                        iconColor={randomColorsArr[3]}
                        icon={<img src="/icons/emptyBox.svg" />}
                        disableIconColor
                        BoxStyle={infoBoxStyle}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6}>
                    <CategoriesEarningsPercentages />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        type="columnly"
                        isLoading={productsStatisticsLoading}
                        title="Categories"
                        body={nDecorator(String(categoriesCount))}
                        iconColor={randomColorsArr[0]}
                        icon={<img src="/icons/categoriesIcon.svg" />}
                        BoxStyle={{ p: 2, height: "100%" }}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DisplayInfoBox
                        type="columnly"
                        isLoading={productsStatisticsLoading}
                        title="Serieses"
                        body={nDecorator(String(seriesesCount))}
                        iconColor={randomColorsArr[1]}
                        icon={<img src="/icons/televisionIcon.svg" />}
                        BoxStyle={{ p: 2, height: "100%" }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Paper sx={{ height: "100%", p: 1 }}>
                        <CategoriesMonthlyEarnings data={earningsChartData} />
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