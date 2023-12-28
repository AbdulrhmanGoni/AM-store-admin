import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { growChartIcon2 } from "../growChartIcon";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "../SmallChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import useMonthlySalesStatistics from "../../hooks/useMonthlySalesStatistics";

function countGrowthRete(pastValue: number = 1, currentValue: number = 1) {
    return (currentValue - pastValue) / pastValue
}

export default function SalesGrowth() {

    const { isLoading, monthesData, isError } = useMonthlySalesStatistics();

    const currentMonth = new Date().getMonth();
    const lastMonthEarnings = monthesData?.[currentMonth - 1].totalEarnings ?? 0;
    const beforeLastMonthEarnings = monthesData?.[currentMonth - 2].totalEarnings ?? 0;

    const growthRete = countGrowthRete(beforeLastMonthEarnings, lastMonthEarnings);

    return (
        <CustomChartBox
            title="Sales growth"
            titleIcon={<SvgIcon svgElementAsString={growChartIcon2} />}
            isLoading={isLoading}
            isError={isError}
            smallChart={<SmalLine data={[beforeLastMonthEarnings, lastMonthEarnings]} tooltipIsMony />}
            mainValue={`${(growthRete * 100).toFixed(2)}%`}
            mainValueColor={growthRete < 0 ? "error" : "success"}
            mainValueEndIcon={growthRete < 0 ? <SouthEast /> : <NorthEast />}
            chartDescription={{
                title: `$${nDecorator(lastMonthEarnings.toFixed(2))}`,
                subTitle: "Last month"
            }}
        />
    )
}