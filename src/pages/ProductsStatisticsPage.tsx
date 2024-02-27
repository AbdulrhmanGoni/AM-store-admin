import { Box, Grid } from "@mui/material";
import CategoriesMonthlyEarnings from "../components/products-pages/CategoriesMonthlyEarnings";
import CategoriesStatistics from "../components/products-pages/CategoriesStatistics";
import randomColorsArr from "../CONSTANTS/randomColorsArr";
import SvgIcon from "../components/SvgIcon";
import { inStockIcon, orderIcon } from "../components/svgIconsAsString";
import { stockIcon } from "../components/stockIcon";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import TopSeries from "../components/products-pages/TopSeries";
import useProductsStatisticsPageContent from "../hooks/useProductsStatisticsPageContent";
import DisplayInfoBox from "../components/DisplayInfoBox";
import PageTitle from "../components/PageTitle";
import { rankingIconMedal } from '../components/rankingIconMedal'
import { rankingIconCup } from '../components/rankingIconCup'
import pageSpaces from "../CONSTANTS/pageSpaces";
import CategoriesMonthlySales from "../components/products-pages/CategoriesMonthlySales";
import useBreakPoints from "../hooks/useBreakPoints";
import RenderSectionWhenSpecificElementAppears from "../components/products-pages/RenderSectionWhenSpecificElementAppears";
import TopProductsContainer from "../components/products-pages/TopProductsContainer";


export default function ProductsStatisticsPage() {

    const { largeScreen, useBetweenDevices } = useBreakPoints("up");

    const {
        productsStatistics: {
            totalInStock,
            totalProducts,
            productsOutOfStock,
            totalProductsSold,
            seriesCount,
            categoriesCount
        },
        productsStatisticsLoading
    } = useProductsStatisticsPageContent();

    const infoBoxStyle = { height: "100%", p: 1.5 };
    const infoBoxType = largeScreen ? "horizontally" : "columnly";
    const sec2InfoBoxStyle = { ...infoBoxStyle, justifyContent: "center" };
    const sec2infoBoxType = useBetweenDevices("sm", "md") ? "horizontally" : "columnly";

    return (
        <Box className="flex-column" id="products-statistics-page" gap={pageSpaces}>
            <PageTitle
                title="Products Statistics"
                description="View statistics and information about products & categories & series"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
            <Grid container spacing={pageSpaces}>
                <Grid item xs={6} sm={3} md={3}>
                    <DisplayInfoBox
                        type={infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="Products"
                        body={nDecorator(String(totalProducts))}
                        iconColor={randomColorsArr[0]}
                        icon={<SvgIcon svgElementAsString={stockIcon} />}
                        disableIconColor
                        boxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <DisplayInfoBox
                        type={infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="Products Sold"
                        body={nDecorator(String(totalProductsSold))}
                        iconColor={randomColorsArr[1]}
                        icon={<img src="/icons/salesShop.svg" />}
                        disableIconColor
                        boxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <DisplayInfoBox
                        type={infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="In Stock"
                        body={nDecorator(String(totalInStock))}
                        iconColor={randomColorsArr[2]}
                        icon={<SvgIcon svgElementAsString={inStockIcon} />}
                        disableIconColor
                        boxStyle={infoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <DisplayInfoBox
                        type={infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="Out of Stock"
                        body={nDecorator(String(productsOutOfStock))}
                        iconColor={randomColorsArr[3]}
                        icon={<img src="/icons/emptyBox.svg" />}
                        disableIconColor
                        boxStyle={infoBoxStyle}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6} order={{ xs: 3, md: 1 }}>
                    <CategoriesStatistics />
                </Grid>
                <Grid item xs={6} md={3} order={{ xs: 1, md: 2 }}>
                    <DisplayInfoBox
                        type={sec2infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="Categories"
                        body={nDecorator(String(categoriesCount))}
                        iconColor={randomColorsArr[4]}
                        icon={<img src="/icons/categoriesIcon.svg" />}
                        boxStyle={sec2InfoBoxStyle}
                    />
                </Grid>
                <Grid item xs={6} md={3} order={{ xs: 2, md: 3 }}>
                    <DisplayInfoBox
                        type={sec2infoBoxType}
                        isLoading={productsStatisticsLoading}
                        title="Series"
                        body={nDecorator(String(seriesCount))}
                        iconColor={randomColorsArr[5]}
                        icon={<img src="/icons/televisionIcon.svg" />}
                        boxStyle={sec2InfoBoxStyle}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ minHeight: "300px" }} id="charts-section" container spacing={pageSpaces}>
                <RenderSectionWhenSpecificElementAppears
                    sectionIdToAbserve="charts-section"
                    section={
                        <>
                            <Grid item xs={12} lg={6}>
                                <CategoriesMonthlyEarnings />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <CategoriesMonthlySales />
                            </Grid>
                        </>
                    }
                />
            </Grid>
            <Grid sx={{ minHeight: "300px" }} id="top-products-section" container spacing={pageSpaces}>
                <RenderSectionWhenSpecificElementAppears
                    sectionIdToAbserve="top-products-section"
                    section={<TopProductsContainer />}
                />
            </Grid>
            <Grid id="top-series-section" sx={{ minHeight: "300px" }} container spacing={pageSpaces}>
                <RenderSectionWhenSpecificElementAppears
                    sectionIdToAbserve="top-series-section"
                    section={
                        <>
                            <Grid item xs={12} sm={6}>
                                <TopSeries
                                    title="Best Selling"
                                    icon={<SvgIcon svgElementAsString={rankingIconCup} width={30} height={30} />}
                                    sortType="topEarnings"
                                    isMoney
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TopSeries
                                    title="Top Selling"
                                    icon={<SvgIcon svgElementAsString={rankingIconMedal} width={30} height={30} />}
                                    sortType="topSold"
                                />
                            </Grid>
                        </>
                    }
                />
            </Grid>
        </Box>
    )
}