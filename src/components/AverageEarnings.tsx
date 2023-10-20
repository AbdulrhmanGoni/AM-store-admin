import CustomChartBox from "./CustomChartBox";
import SvgIcon from "./SvgIcon";
import { averageEarningsIcon } from "./svgIconsAsString";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import { SmalLine } from "./SmallChart";
import { faker } from "@faker-js/faker";
import { dataProps } from "./SalesGrowth";

type AverageEarningsProps = {
    data: dataProps[],
    isError: boolean,
    isLoading: boolean
}

export default function AverageEarnings({ data, isError, isLoading }: AverageEarningsProps) {

    const earnings: number[] = data?.map((mon: dataProps) => {
        const randomNimber = faker.number.float({ precision: 0.01, max: 5000, min: 4000 });
        return mon.totalEarnings ? mon.totalEarnings : randomNimber
    });
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

