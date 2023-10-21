import { JSX } from "react";
import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { categoriesEarningsIcon } from "../svgIconsAsString";
import { Box, Typography, capitalize } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalDonut } from "../SmallChart";
import { PromiseState } from "../../types/interfaces";
import calculatePercentage from "../../functions/calculatePercentage";

type data = { color: string, name: string }
export interface chartCategory extends data { data: number[] }
interface series extends data { total: number }

interface CategoriesEarningsPercentages extends PromiseState {
    data: chartCategory[],
    isError: boolean,
    isLoading: boolean,
    totalEarnings: number
}
export default function CategoriesEarningsPercentages({ data, isError, isLoading, totalEarnings }: CategoriesEarningsPercentages) {

    const series: series[] = data.map(({ name, color, data }: chartCategory) => {
        return {
            name, color,
            total: data?.reduce((acc: number, curr: number) => acc + curr) ?? 0,
        }
    })

    const chartColors: string[] = series?.map((cat: series) => cat.color);
    const legends: JSX.Element[] = series?.map(({ color, name, total: categoryEarnings }: series) => {
        return (
            <Box key={name} sx={{ display: "flex", alignItems: "center", gap: "6px", "& > p": { fontSize: "15px" } }}>
                <Typography sx={legendsMark(color)}></Typography>
                <Typography>{capitalize(name)}</Typography>
                <Typography>{calculatePercentage(totalEarnings, categoryEarnings)}%</Typography>
            </Box>
        )
    })

    return (
        <CustomChartBox
            title="Categories Earnings"
            customMainValue={<Box sx={legendsContainer}>{legends}</Box>}
            isLoading={isLoading}
            isError={isError}
            smallChart={
                <SmalDonut
                    data={series.map((cat: series) => cat.total)}
                    tooltipIsMony
                    height={85}
                    colors={chartColors}
                />
            }
            titleIcon={<SvgIcon svgElementAsString={categoriesEarningsIcon} />}
            chartDescription={{ title: `$${nDecorator(totalEarnings.toFixed(2))}`, subTitle: "This Year" }}
        />
    )
}

const legendsContainer = {
    display: "flex",
    flexDirection: "column",
    height: "70px",
    overflow: "auto",
    pr: 1
}

const legendsMark = (bgcolor: string) => {
    return {
        width: 15,
        height: 15,
        borderRadius: "50%",
        bgcolor
    }
}