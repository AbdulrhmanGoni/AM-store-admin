import CustomChartBox from "./CustomChartBox";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import SvgIcon from "@/components/SvgIcon";
import { categoriesEarningsIcon } from "@/images/svgIconsAsString";
import { useQuery } from "@tanstack/react-query";
import randomColorsArr from '@/CONSTANT/randomColorsArr';
import { Box, Typography, capitalize } from "@mui/material";
import { numbersDecorator } from "goni-functions";
import { SmalDonut } from "./SmallChart";

export default function CategoriesEarningsPercentages() {

    const { statistics_categories } = useStatisticsQueries();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["categories-earnings"],
        queryFn: statistics_categories
    });

    const categories = Object.keys(data ?? {})
    const series = categories.map((category, index) => {
        return {
            value: data[category].reduce((acc, curr) => acc + +curr.totalEarnings.toFixed(2), 0),
            categoryName: category,
            color: randomColorsArr[index]
        }
    })
    const total = series?.reduce((acc, curr) => acc + curr.value, 0);
    const chartColors: string[] = series?.map((cat) => cat.color);
    const legends = series?.map((cat) => {
        return (
            <Box key={cat.categoryName} sx={{ display: "flex", alignItems: "center", gap: "6px", "& > p": { fontSize: "15px" } }}>
                <Typography sx={legendsMark(cat.color)}></Typography>
                <Typography>{capitalize(cat.categoryName)}</Typography>
                <Typography>{((cat.value / total) * 100).toFixed(2)}%</Typography>
            </Box >
        )
    })

    return (
        <CustomChartBox
            title="Categories Earnings"
            customMainValue={<Box sx={{ display: "flex", flexDirection: "column" }}>{legends}</Box>}
            error={isError}
            smallChart={<SmalDonut data={series?.map((cat) => cat.value)} tooltipIsMony height={85} colors={chartColors} />}
            loading={isLoading}
            titleIcon={<SvgIcon svgElementAsString={categoriesEarningsIcon} />}
            chartDescription={{ title: `$${numbersDecorator(total)}`, subTitle: "Total" }}
        />
    )
}

const legendsMark = (bgcolor: string) => {
    return {
        width: 15,
        height: 15,
        borderRadius: "50%",
        bgcolor
    }
}