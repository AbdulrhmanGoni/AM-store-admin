"use client"
import { Box, Grid, Paper, alpha, Typography, Skeleton } from "@mui/material";
import CategoriesCharts from "../components/CategoriesEarnings";
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

const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

export default function ProductsStatistics() {

    const requestPath = 'statistics/?get=categories-earnings&return=totalEarnings,date,category'
    const { data, isError, isLoading } = useGetApi({
        key: ["categories-statistics"],
        path: requestPath
    })
    const { data: productsCount } = useGetApi({ key: ["products-count"], path: "products/length" })

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6.5} lg={8}>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={paperStyle}>
                            <CategoriesCharts data={data} />
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5.5} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 2 } }}>
                        <Paper sx={{ p: 1, height: "200px" }}>
                            <CategoriesEarningsPercentages
                                data={data}
                                isError={isError}
                                isLoading={isLoading}
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
                                body={nDecorator(5432)}
                                color={randomColorsArr[2]}
                                icon={<Inbox />}
                            />
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

type DisplayInfoType = {
    color: string,
    title: string,
    body: string | number,
    icon: any,
    isLoading?: boolean
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
            <Box
                component="div"
                className='flex-center'
                sx={{
                    p: "13px", borderRadius: "5px",
                    border: `solid 1px ${color}`,
                    bgcolor: alpha(color, .5),
                    "& svg": { fill: "white !important", width: "1.2em", height: "1.2em" }
                }}
            >
                {isLoading ? <LoadingGrayBar type="rou" h={35} w={35} /> : icon}
            </Box>
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