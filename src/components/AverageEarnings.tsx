import CustomChartBox from "./CustomChartBox";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import SvgIcon from "@/components/SvgIcon";
import { averageEarningsIcon } from "./svgIconsAsString";
import { useQuery } from "@tanstack/react-query";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalLine } from "./SmallChart";

export default function AverageEarnings() {

    const { statistics_earnings } = useStatisticsQueries();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["earnings-statistics"],
        queryFn: statistics_earnings,
    });

    const earnings: number[] = data?.map(mon => mon.totalEarnings);
    const total: number = earnings?.filter(num => !!num).reduce((acc, cur) => acc + cur, 0);

    return (
        <CustomChartBox
            title="Average earnings"
            mainValue={`$${nDecorator(total?.toFixed(2))}`}
            error={isError}
            smallChart={<SmalLine data={earnings} tooltipIsMony />}
            loading={isLoading}
            titleIcon={<SvgIcon svgElementAsString={averageEarningsIcon} />}
            chartDescription={{ title: `$${(total / data?.length).toFixed(2)}`, subTitle: "Per month" }}
        />
    )
}

