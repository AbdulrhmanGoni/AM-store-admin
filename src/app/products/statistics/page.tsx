"use client"
import { Box, Grid, Paper, alpha, Typography } from "@mui/material";
import CategoriesCharts from "../components/CategoriesEarnings";
import CategoriesEarningsPercentages from "../components/CategoriesEarningsPercentages";
import ProductsTopSales from "../components/ProductsTopSales";
import ProductsTopEarnings from "../components/ProductsTopEarnings";
import useGetApi from "@/hooks/useGetApi";
import randomColorsArr from "@/CONSTANT/randomColorsArr";
import { DirtyLens, SportsCricketRounded } from "@mui/icons-material";

const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 1
}

export default function ProductsStatistics() {

    const requestPath = 'statistics/?get=categories-earnings&return=totalEarnings,date,category'
    const {
        data, isError, isLoading
    } = useGetApi({
        key: ["categories-statistics", "page"],
        path: requestPath
    })

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
                                title="Products"
                                body="32"
                                color={randomColorsArr[3]}
                                icon={<DirtyLens />}
                            />
                            <DisplayInfo
                                title="In Stock"
                                body="15K"
                                color={randomColorsArr[2]}
                                icon={<SportsCricketRounded />}
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

function DisplayInfo({ color, title, body, icon }) {
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
                    "& svg": { fill: "white", width: "1.2em", height: "1.2em" }
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h5">{body}</Typography>
            </Box>
        </Paper>
    )
}