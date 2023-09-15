import { JSX } from "react";
import CustomChartBox from "@/components/CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { categoriesEarningsIcon } from "@/components/svgIconsAsString";
import { Box, Typography, capitalize } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalDonut } from "@/components/SmallChart";

type data = { color: string, name: string }
interface category extends data { data: number[] }
interface series extends data { total: number }

type CategoriesEarningsPercentages = {
    data: category[],
    isError: boolean,
    isLoading: boolean,
    totalEarnings: number
}
export default function CategoriesEarningsPercentages({ data, isError, isLoading, totalEarnings }: CategoriesEarningsPercentages) {

    const series: series[] = data.map(({ name, color, data }: category) => {
        return {
            name, color,
            total: data?.reduce((acc: number, curr: number) => acc + curr) ?? 0,
        }
    })

    const chartColors: string[] = series?.map((cat: series) => cat.color);
    const legends: JSX.Element[] = series?.map((cat: series) => {
        return (
            <Box key={cat.name} sx={{ display: "flex", alignItems: "center", gap: "6px", "& > p": { fontSize: "15px" } }}>
                <Typography sx={legendsMark(cat.color)}></Typography>
                <Typography>{capitalize(cat.name)}</Typography>
                <Typography>{((cat.total / totalEarnings) * 100).toFixed(2)}%</Typography>
            </Box>
        )
    })

    return (
        <CustomChartBox
            title="Categories Earnings"
            customMainValue={<Box sx={legendsContainer}>{legends}</Box>}
            error={isError}
            smallChart={
                <SmalDonut
                    data={series.map((cat: series) => cat.total)}
                    tooltipIsMony
                    height={85}
                    colors={chartColors}
                />
            }
            loading={isLoading}
            titleIcon={<SvgIcon svgElementAsString={categoriesEarningsIcon} />}
            chartDescription={{ title: `$${nDecorator(totalEarnings.toFixed(2))}`, subTitle: "Total" }}
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