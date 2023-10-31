import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { growChartIcon2 } from "../growChartIcon";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "../SmallChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { MonthlyStatistics, MonthStatistics } from "../../hooks/useMonthlyStatistics";
import MONTHES from "../../CONSTANTS/MONTHES";

interface SalesGrowthProps extends MonthlyStatistics { }

function countGrowthRete(pastValue: number = 1, currentValue: number = 1) {
    return (currentValue - pastValue) / pastValue
}

export default function SalesGrowth({ monthesData, isError, isLoading }: SalesGrowthProps) {

    const currentMonth = new Date().getMonth();
    const lastMonth = MONTHES[currentMonth - 1];
    const beforeLastMonth = MONTHES[currentMonth - 2];
    let lastMonthEarnings = 0;
    let beforeLastMonthEarnings = 0;

    monthesData?.forEach(({ month, totalEarnings }: MonthStatistics) => {
        lastMonthEarnings += month === lastMonth ? totalEarnings : 0;
        beforeLastMonthEarnings += month === beforeLastMonth ? totalEarnings : 0;
    });

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
                subTitle: "Last month",
                severity: "default"
            }}
        />
    )
}