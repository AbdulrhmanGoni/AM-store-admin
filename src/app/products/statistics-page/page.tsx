"use client"
import { Box, Grid, Paper } from "@mui/material";
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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6.5} lg={4}>
                    <Paper sx={{ p: 1, height: "200px" }}>
                        <CategoriesEarningsPercentages
                            data={earningsChartData}
                            totalEarnings={totalEarnings}
                            isLoading={chartLoading}
                            isError={chartError}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}></Grid>
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
                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
                        <Box sx={{
                            display: "flex",
                            gap: { xs: 1, md: 2 },
                            height: "200px"
                        }}>
                            <DisplayInfoBox
                                type="columnly"
                                isLoading={productsStatisticsLoading}
                                title="Products"
                                body={nDecorator(String(productsTotals?.totalProducts))}
                                color={randomColorsArr[3]}
                                icon={<Icon svgElementAsString={stockIcon} />}
                                disableIconColor
                                BoxStyle={{ flexBasis: "50%" }}
                            />
                            <DisplayInfoBox
                                type="columnly"
                                isLoading={productsStatisticsLoading}
                                title="Categories"
                                body={nDecorator(String(productsTotals?.categoriesCount))}
                                color={randomColorsArr[1]}
                                icon={<Icon svgElementAsString={categoriesIcon} />}
                                BoxStyle={{ flexBasis: "50%" }}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            gap: { xs: 1, md: 2 },
                            height: "200px"
                        }}>
                            <DisplayInfoBox
                                type="columnly"
                                isLoading={productsStatisticsLoading}
                                title="Products Sold"
                                body={nDecorator(String(productsTotals?.totalProductsSold))}
                                color={randomColorsArr[0]}
                                icon={<Icon svgElementAsString={stockIcon} />}
                                disableIconColor
                                BoxStyle={{ flexBasis: "50%" }}
                            />
                            <DisplayInfoBox
                                type="columnly"
                                isLoading={productsStatisticsLoading}
                                title="In Stock"
                                body={nDecorator(String(productsTotals?.totalInStock))}
                                color={randomColorsArr[2]}
                                icon={<Icon svgElementAsString={inStockIcon} />}
                                disableIconColor
                                BoxStyle={{ flexBasis: "50%" }}
                            />
                        </Box>
                    </Box>
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

// type DisplayInfoType = {
//     color: string,
//     icon: any,
//     isLoading?: boolean,
//     disableIconColor?: boolean,
//     title: string,
//     body?: string | number
// }

// function DisplayInfo({ color, title, body, icon, isLoading, disableIconColor = false }: DisplayInfoType) {
//     return (
//         <Paper sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-start",
//             flexBasis: "100%",
//             gap: 2, p: "0px 16px"
//         }}>
//             <SmallIconBox
//                 icon={icon}
//                 color={color}
//                 disableIconColor={disableIconColor}
//                 svgIconSize={30}
//             >
//                 {isLoading ? <LoadingGrayBar type="rou" h={35} w={35} /> : undefined}
//             </SmallIconBox>
//             <Box>
//                 {
//                     isLoading ?
//                         <>
//                             <LoadingGrayBar sx={{ mb: 1 }} type="rou" h={25} w={100} />
//                             <LoadingGrayBar type="rou" h={30} w={100} />
//                         </>
//                         :
//                         <>
//                             <Typography variant="h6">{title}</Typography>
//                             <Typography variant="h5">{body}</Typography>
//                         </>
//                 }
//             </Box>
//         </Paper>
//     )
// }