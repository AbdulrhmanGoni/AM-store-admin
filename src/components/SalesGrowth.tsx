import CustomChartBox from "./CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { growthIcon } from "./svgIconsAsString";
import moment from "moment";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "./SmallChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { PromiseState } from "@/types/interfaces";

interface SalesGrowthProps extends PromiseState { data: any }

export interface dataProps {
    month: string,
    totalEarnings: number
}

function countGrowthRete(pastValue: number = 1, currentValue: number = 1) {
    return (currentValue - pastValue) / pastValue
}

export default function SalesGrowth({ data, isError, isLoading }: SalesGrowthProps) {

    const currentMonth = moment().month();
    const lastMonth = moment().month(currentMonth - 1).format("MMM");
    const beforeLastMonth = moment().month(currentMonth - 2).format("MMM");
    let lastMonthEarnings = 0;
    let beforeLastMonthEarnings = 0;

    data?.forEach(({ month, totalEarnings }: dataProps) => {
        lastMonthEarnings += month === lastMonth ? totalEarnings : 0;
        beforeLastMonthEarnings += month === beforeLastMonth ? totalEarnings : 0;
    });

    const growthRete = countGrowthRete(beforeLastMonthEarnings, lastMonthEarnings);

    return (
        <CustomChartBox
            title="Sales growth"
            titleIcon={<SvgIcon svgElementAsString={growthIcon} />}
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