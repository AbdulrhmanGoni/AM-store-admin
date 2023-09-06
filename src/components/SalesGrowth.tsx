import CustomChartBox from "./CustomChartBox";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import SvgIcon from "@/components/SvgIcon";
import { growthIcon } from "./svgIconsAsString";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "./SmallChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";


function countGrowthRete(pastValue: number = 1, currentValue: number = 1) {
    return (currentValue - pastValue) / pastValue
}

export default function SalesGrowth() {
    const { statistics_earnings } = useStatisticsQueries();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["earnings-statistics"],
        queryFn: statistics_earnings,
    });

    const currentMonth = moment().month();
    const lastMonth = moment().month(currentMonth - 1).format("MMM");
    const beforeLastMonth = moment().month(currentMonth - 2).format("MMM");
    const dates = data?.filter(mon => mon.date.match(new RegExp(`(${beforeLastMonth}|${lastMonth})`)));
    const lastMonthEarnings = dates?.find((month) => month.date.match(new RegExp(lastMonth)));
    const beforeLastMonthEarnings = dates?.find((month) => month.date.match(new RegExp(beforeLastMonth)));
    const growthRete = countGrowthRete(beforeLastMonthEarnings?.totalEarnings, lastMonthEarnings?.totalEarnings);
    const chartData = dates?.map(mon => mon.totalEarnings);


    return (
        <CustomChartBox
            title="Sales growth"
            titleIcon={<SvgIcon svgElementAsString={growthIcon} />}
            loading={isLoading}
            smallChart={<SmalLine data={chartData} tooltipIsMony />}
            mainValue={`${(growthRete * 100).toFixed(2)}%`}
            mainValueColor={growthRete < 0 ? "error" : "success"}
            mainValueEndIcon={growthRete < 0 ? <SouthEast /> : <NorthEast />}
            error={isError}
            chartDescription={{
                title: `$${nDecorator(lastMonthEarnings?.totalEarnings.toFixed(2))}`,
                subTitle: "Last month",
                severity: "default"
            }}
        />
    )
}
