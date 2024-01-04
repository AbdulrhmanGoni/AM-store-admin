import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { averageEarningsIcon } from "../svgIconsAsString";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalLine } from "../SmallChart";
import { MonthSalesStatistics } from "../../hooks/useMonthlySalesStatistics";


interface AverageEarningsProps {
    data: MonthSalesStatistics[],
    isError: boolean,
    isLoading: boolean
}

export default function AverageEarnings({ data, isError, isLoading }: AverageEarningsProps) {

    const earnings: number[] = data?.map((mon: MonthSalesStatistics) => mon.totalEarnings);
    const total: number = earnings?.reduce((acc, cur) => acc + cur, 0);

    return (
        <CustomChartBox
            title="Average Earnings"
            mainValue={`$${nDecorator(total?.toFixed(2))}`}
            isLoading={isLoading}
            isError={isError}
            smallChart={<SmalLine data={earnings} tooltipIsMony />}
            titleIcon={<SvgIcon svgElementAsString={averageEarningsIcon} />}
            chartDescription={{ title: `$${nDecorator((total / data?.length).toFixed(2))}`, subTitle: "Per month" }}
        />
    )
}

