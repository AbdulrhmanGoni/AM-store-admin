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

    const totalsBoxesData = [
        {
            title: 'Products',
            icon: <SvgIcon svgElementAsString={stockIcon} />,
            body: totalProducts
        },
        {
            title: 'Products Sold',
            icon: <img src="/icons/salesShop.svg" />,
            body: totalProductsSold
        },
        {
            title: 'In Stock',
            icon: <SvgIcon svgElementAsString={inStockIcon} />,
            body: totalInStock
        },
        {
            title: 'Out of Stock',
            icon: <img src="/icons/emptyBox.svg" />,
            body: productsOutOfStock
        },
        {
            title: 'Categories',
            icon: <img src="/icons/categoriesIcon.svg" />,
            body: categoriesCount
        },
        {
            title: 'Series',
            icon: <img src="/icons/televisionIcon.svg" />,
            body: seriesCount
        }
    ]

    return (
        <Box className="flex-column" id="products-statistics-page" gap={pageSpaces}>
            <PageTitle
                title="Products Statistics"
                description="View statistics and information about products & categories & series"
                icon={<SvgIcon svgElementAsString={orderIcon} />}
            />
            <Grid container spacing={pageSpaces}>
                {
                    totalsBoxesData.map(({ title, icon, body }, index) => (
                        index < 4 &&
                        <Grid item xs={6} sm={3} md={3} key={title}>
                            <DisplayInfoBox
                                title={title}
                                body={body ? nDecorator(String(body)) : 0}
                                icon={icon}
                                type={infoBoxType}
                                isLoading={productsStatisticsLoading}
                                iconColor={randomColorsArr[index]}
                                disableIconColor
                                boxStyle={infoBoxStyle}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container spacing={pageSpaces}>
                <Grid item xs={12} md={6} order={{ xs: 3, md: 1 }}>
                    <CategoriesStatistics />
                </Grid>
                {
                    totalsBoxesData.map(({ title, icon, body }, index) => (
                        index > 3 &&
                        <Grid item xs={6} md={3} order={{ xs: 1, md: 2 }} key={title}>
                            <DisplayInfoBox
                                title={title}
                                type={sec2infoBoxType}
                                isLoading={productsStatisticsLoading}
                                body={body ? nDecorator(String(body)) : 0}
                                iconColor={randomColorsArr[index]}
                                icon={icon}
                                boxStyle={sec2InfoBoxStyle}
                            />
                        </Grid>
                    ))
                }
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
            <PageTitle
                title="Top Products"
                description="Display the best products in AM Store"
                containerSX={{ mt: 1 }}
            />
            <Grid sx={{ minHeight: "300px" }} id="top-products-section" container spacing={pageSpaces}>
                <RenderSectionWhenSpecificElementAppears
                    sectionIdToAbserve="top-products-section"
                    section={<TopProductsContainer />}
                />
            </Grid>
            <PageTitle
                title="Top Series"
                description="Display the most popular series in AM Store"
                containerSX={{ mt: 1 }}
            />
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