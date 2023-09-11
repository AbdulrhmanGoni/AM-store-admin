import CustomChartBox from "../../../components/CustomChartBox";
import SvgIcon from "@/components/SvgIcon";
import { averageOrdersIcon } from "../../../components/svgIconsAsString";
import useStatisticsQueries from "@/hooks/useStatisticsQueries";
import { useQuery } from "@tanstack/react-query";
import { SmalBar } from "../../../components/SmallChart";
import { faker } from "@faker-js/faker";


export default function AverageOrders() {

    const { statistics_orders } = useStatisticsQueries();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders-statistics"],
        queryFn: statistics_orders
    });

    const dataChart: number[] = data?.map((doc: { totalOrder: number }) => {
        let randomNimber = faker.number.float({ precision: 1, max: 50, min: 30 });
        return !!doc.totalOrder ? doc.totalOrder : randomNimber
    })
    const total: number = dataChart?.reduce((acc, cur) => acc + cur, 0);

    return (
        <CustomChartBox
            title="Average orders"
            smallChart={<SmalBar data={dataChart} />}
            mainValue={total}
            loading={isLoading}
            error={isError}
            titleIcon={<SvgIcon svgElementAsString={averageOrdersIcon} />}
            chartDescription={{ title: `${Math.floor(total / dataChart?.length)} orders`, subTitle: "Per month" }}
        />
    )
}
