import CustomChartBox from "@/components/CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { categoriesEarningsIcon } from "@/components/svgIconsAsString";
import randomColorsArr from '@/CONSTANT/randomColorsArr';
import { Box, Typography, capitalize } from "@mui/material";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalDonut } from "@/components/SmallChart";

export default function CategoriesEarningsPercentages({ data, isError, isLoading }) {

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
            chartDescription={{ title: `$${nDecorator(total)}`, subTitle: "Total" }}
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