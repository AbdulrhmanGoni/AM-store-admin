import CustomChartBox from "../CustomChartBox";
import SvgIcon from "../SvgIcon";
import { growChartIcon2 } from "../growChartIcon";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { SmalLine } from "../SmallChart";
import { nDecorator } from "@abdulrhmangoni/am-store-library";
import useGetApi from "../../hooks/useGetApi";

interface SalesGrowthType {
    beforeLastMonth: { earnings: number, month: string },
    lastMonth: { earnings: number, month: string },
    growthRete: number
}

export default function SalesGrowth() {

    const query = "sales-growth"
    const { data: growthReteData, isFetching: isLoading, isError } = useGetApi<SalesGrowthType>({
        path: `statistics?queryKey=sales-growth`,
        key: [query]
    });

    const lastMonthEarnings = growthReteData?.lastMonth.earnings || 0;
    const beforeLastMonthEarnings = growthReteData?.beforeLastMonth.earnings || 0;
    const growthRete = growthReteData?.growthRete || 0

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