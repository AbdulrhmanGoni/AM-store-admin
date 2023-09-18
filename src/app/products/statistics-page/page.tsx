"use client"
import { Box, Grid, Paper, Typography } from "@mui/material";
import CategoriesEarnings from "../components/CategoriesEarnings";
import CategoriesEarningsPercentages from "../components/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/ProductsTopSales";
import ProductsTopEarnings from "../components/ProductsTopEarnings";
import useGetApi from "@/hooks/useGetApi";
import randomColorsArr from "@/CONSTANT/randomColorsArr";
import { Inbox } from "@mui/icons-material";
import Icon from "@/components/SvgIcon";
import { productsIcon } from "@/components/svgIconsAsString";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import LoadingGrayBar from "@/components/LoadinGrayBar";
import SmallIconBox from "@/components/SmallIconBox";
import { faker } from "@faker-js/faker";


export default function ProductsStatistics() {

    const requestPath = 'statistics/?get=categories-statistics';
    const { data: productsCount } = useGetApi({
        key: ["products-count"],
        path: "products/length"
    })
    const { data: productsInStock } = useGetApi({
        key: ["products-in-stock"],
        path: "products/in-stock"
    })
    const { data, isError, isLoading } = useGetApi({
        key: ["categories-statistics"],
        path: requestPath
    })
    const { data: topProducts, isLoading: topProductsLoading, isError: topProductsError } = useGetApi({
        key: ["top-products"],
        path: "statistics/?get=top-products&limit=5"
    })

    let total: number = 0;
    const series = Object.keys(data ?? {}).map((category, index) => {
        return {
            name: category,
            color: randomColorsArr[index],
            data: data[category]?.map((doc: { totalEarnings: number }) => {
                let randomNumber = faker.number.float({ precision: 0.02, max: 3000, min: 1500 });
                let totalEarnings = doc.totalEarnings ? doc.totalEarnings : randomNumber;
                total += totalEarnings;
                return +totalEarnings.toFixed(2);
            }) ?? [0]
        }
    })
    let inStock: number = productsInStock?.reduce((total: number, cat: { inStock: number; }) => cat.inStock + total, 0);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ p: 1 }}>
                            <CategoriesEarnings data={series} />
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
                        <Paper sx={{ p: 1, height: "200px" }}>
                            <CategoriesEarningsPercentages
                                data={series}
                                totalEarnings={total}
                                isLoading={isLoading}
                                isError={isError}
                            />
                        </Paper>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row", md: "column" },
                            gap: { xs: 1, md: 2 },
                            height: { xs: "200px", sm: "100px", md: "200px" }
                        }}>
                            <DisplayInfo
                                isLoading={isLoading}
                                title="Products"
                                body={productsCount}
                                color={randomColorsArr[3]}
                                icon={<Icon svgElementAsString={productsIcon} />}
                            />
                            <DisplayInfo
                                isLoading={isLoading}
                                title="In Stock"
                                body={nDecorator(inStock)}
                                color={randomColorsArr[2]}
                                icon={<Inbox />}
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
            </Grid>
        </Box>
    )
}

type DisplayInfoType = {
    color: string,
    icon: any,
    isLoading?: boolean
    title: string,
    body: string | number,
}

function DisplayInfo({ color, title, body, icon, isLoading }: DisplayInfoType) {
    return (
        <Paper sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexBasis: "100%",
            gap: 2, p: "0px 16px"
        }}>
            <SmallIconBox
                icon={icon}
                color={color}
                svgIconSize={30}
            >
                {isLoading ? <LoadingGrayBar type="rou" h={35} w={35} /> : undefined}
            </SmallIconBox>
            <Box>
                {
                    isLoading ?
                        <>
                            <LoadingGrayBar sx={{ mb: 1 }} type="rou" h={25} w={100} />
                            <LoadingGrayBar type="rou" h={30} w={100} />
                        </>
                        :
                        <>
                            <Typography variant="h6">{title}</Typography>
                            <Typography variant="h5">{body}</Typography>
                        </>
                }
            </Box>
        </Paper>
    )
}