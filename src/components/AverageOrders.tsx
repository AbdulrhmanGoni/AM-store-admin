import CustomChartBox from "./CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { averageOrdersIcon } from "@/images/svgIconsAsString";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import { useQuery } from "@tanstack/react-query";
import { SmalBar } from "./SmallChart";


export default function AverageOrders() {

    const { statistics_orders } = useStatisticsQueries();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders-statistics"],
        queryFn: statistics_orders
    });

    const dataChart: number[] = data?.map(mon => mon.totalOrders);
    const orders: number[] = dataChart?.filter(num => !!num);
    const total: number = orders?.reduce((acc, cur) => acc + cur, 0);

    return (
        <CustomChartBox
            title="Average orders"
            smallChart={<SmalBar data={dataChart} />}
            mainValue={total}
            loading={isLoading}
            error={isError}
            titleIcon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
            chartDescription={{ title: `${Math.floor(total / orders?.length)} orders`, subTitle: "Per month" }}
        />
    )
}
