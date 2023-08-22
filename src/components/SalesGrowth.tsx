import CustomChartBox from "./CustomChartBox";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import SvgIcon from "@/components/SvgIcon";
import { growthIcon } from "@/images/svgIconsAsString";
import { useQuery } from "@tanstack/react-query";
import { numbersDecorator } from "goni-functions";
import moment from "moment";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "./SmallChart";

function countGrowthRete(pastValue: number = 1, currentValue: number = 1) {
    return (currentValue - pastValue) / pastValue
}

export default function SalesGrowth() {
    const { statistics_earnings } = useStatisticsQueries();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["earnings-statistics"],
        queryFn: statistics_earnings,
    });

    const currentMonth = moment().format("MMM");
    const lastMonth = moment().month(moment().month() - 1).format("MMM");
    const dates = data?.filter(mon => mon.date.match(new RegExp(`(${currentMonth}|${lastMonth})`)));
    const lastMonthEarnings = dates?.find((month) => month.date.match(new RegExp(lastMonth)));
    const currentMonthEarnings = dates?.find((month) => month.date.match(new RegExp(currentMonth)));
    const growthRete = countGrowthRete(lastMonthEarnings?.totalEarnings, currentMonthEarnings?.totalEarnings);
    const chartData = dates?.map(mon => mon.totalEarnings);


    return (
        <CustomChartBox
            title="Sales growth"
            titleIcon={<SvgIcon svgElementAsString={growthIcon} />}
            loading={isLoading}
            smallChart={<SmalLine data={chartData} tooltipIsMony />}
            mainValue={`${(growthRete * 100).toFixed(2)}%`}
            mainValueColor="error"
            mainValueEndIcon={growthRete < 0 ? <SouthEast /> : <NorthEast />}
            error={isError}
            chartDescription={{
                title: `$${numbersDecorator(lastMonthEarnings?.totalEarnings.toFixed(2))}`,
                subTitle: "Last month",
                severity: "default"
            }}
        />
    )
}
